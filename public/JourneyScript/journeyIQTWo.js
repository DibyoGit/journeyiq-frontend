let str = window.navigator.userAgent
const plt = str.split(/[()]/)[1].split(" ");

let ip = null || sessionStorage.getItem('ip')
const locate = {} || JSON.stringify(sessionStorage.getItem('locationInfo'))

let Extraction = {}
/* 
setCookie('sessionID' , "UTz6qiaBbdAtN_7AGQg0uD_5JK77owFG"); */

async function check() {
  if (!getCookie('userID')) {
    let info = await getIp() 
    console.log(info)
    let sessionData = {

      "initialPageLoad": new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' }),
      "httpRefer": document.referrer,
      "homePage": window.location.href,
      "hostname": window.hostname,
      "language": window.navigator.language,
      "platform": `${plt[0]} ${plt[1]} ${plt[2]}`,
      "port": window.navigator.port,
      "title": document.title,
      "device": DeviceCheck(),
      "location": info,
      "deviceInfo": str.replace(/[;]/g, ' '),
      "clientStart": {
        "innerWidth": window.innerWidth,
        "innerHeight": window.innerHeight,
        "outerWidth": window.outerWidth,
        "outerHeight": window.outerHeight
      },
      "navigation": []
    }
    await SetUserID(sessionData)
  }
  if (!sessionStorage.getItem('sessionID')) {
    await getSessionID()

  }
}
check()

window.onload = function (e) {

  console.log(e)
  const PageInformation = {
    sessionID: sessionStorage.getItem('sessionID'),
    loadTime: new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' }),
    unloadTime: "",
    baseURI: document.baseURI,
    port: window.navigator.port,
    type: 'load',
    PageTitle: document.title,
    metaValue: document.getElementsByTagName("meta"),
    event: [],
    historyLength: window.history.length,
    prevPage: window.referrer || sessionStorage.getItem('pre')
  }
  console.log(PageInformation.loadTime)
  document.addEventListener('click', function (event) {
    console.log(event)
    console.log(event.path[0])
    var child = [];
    let tracker = {}

    if (event.path[0].nodeName === 'DIV') {
      let element = event.path[0].children

      for (let i = 0; i < element.length; i++) {
        let val = {
          value: element[i].innerHTML,
          tag: element[i].nodeName,
          src: element[i].src,
          href: element[i].href,
          alt: element[i].alt,
        }
        child.push(val)
      }

      tracker = {
        tagName: "DIV",
        value: event.path[0].innerHTML,
        className: event.path[0].className,
        src: event.path[0]?.src,
        href: event.path[0]?.href,
        alt: event.path[0]?.alt,
        childNode: child
      }

    }

    else {
      tracker = {
        tagName: event.path[0].nodeName,
        value: event.path[0].innerHTML,
        className: event.path[0].className,
        src: event.path[0]?.src,
        href: event.path[0]?.href,
        alt: event.path[0]?.alt,
        childNode: child
      }

    }

    PageInformation.event.push(tracker)
  })

  window.addEventListener('beforeunload', async function (e) {
    sessionStorage.setItem('pre', this.document.URL)
    PageInformation.unloadTime = new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' })
    await UpdateUserSessionDetail(PageInformation)


  })


}

function DeviceCheck() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device
    return "Mobile";
  } else {
    // false for not mobile device
    return "Desktop";
  }
}

 async function getIp() {
  const IP = getCookie('locationInfo')
  if (typeof IP == 'undefined') {
    try {
      let res = await fetch('https://ipapi.co/json/')
      console.log("res", res)
      let json = await res.json();
      console.log(json)
      const { country_name, region, region_code , city, ip, timezone,country_code } = json
      console.log(country_name, region, region_code, city, ip, timezone)
      const data = {
        "country": country_name,
        "region": region,
        "countrycode": country_code,
        "regioncode": region_code,            
        "timezone": timezone,
        "city": city,
        "ip": ip
      }
      sessionStorage.setItem('locationInfo', JSON.stringify(data));
      sessionStorage.setItem('ip', ip) 
      return data
     
    } catch (e) {
      console.log(e.message)
    }

  }

}
 
function setSessionValue(name, value) {
  let val = JSON.stringify(value)
  sessionStorage.setItem(name, val)

}
function getSessionValue(name) {

  return JSON.parse(sessionStorage.getItem(name))
}

function setCookie(name, value, options) {
  options = options || {};

  let expires = options.expires;

  if (typeof expires == "number" && expires) {
    let currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + expires * 1000);
    expires = options.expires = currentDate;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }


  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (let propName in options) {
    updatedCookie += "; " + propName;
    let propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  updatedCookie += ";path=/;sameSite=Lax";
  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function SetUserSessionData(data) {
  fetch('https://journeyiq-journey-services.herokuapp.com/api/session/set_user_session'
    , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  )
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

async function SetUserID(data) {
  let res = await fetch('https://journeyiq-journey-services.herokuapp.com/api/session/set_user_session'
    , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  )
  let response = await res.json()
  console.log(response)
  setCookie('userID', response.ID)
  sessionStorage.setItem('sessionID', response.sessionID)
  return ''
}


async function getSessionID() {
  let res = await fetch('https://journeyiq-journey-services.herokuapp.com/api/session/'
    , {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }
  )
  let text = await res.text()
  sessionStorage.setItem('sessionID', text)
  return text

}

async function getUserSessionDetail() {

  const sessionID = sessionStorage.getItem('sessionID')
  console.log(sessionID)
  let res = await fetch(`https://journeyiq-journey-services.herokuapp.com/api/session/get_user_session?sessionID=${sessionID}`
    , {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }
  )
  let json = await res.json()
  console.log(json.response)
  return json.response.Navigation

}

async function UpdateUserSessionDetail(data) {

  const res = await fetch('https://journeyiq-journey-services.herokuapp.com/api/session/update_user_session'
    , {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        sessionID: /* sessionStorage.getItem('sessionID') || */ getCookie('userID'),
        navigation: data
      })
    }
  )
  let json = await res.json()
  return json
}
