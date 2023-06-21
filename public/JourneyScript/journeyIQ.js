
const API = 'https://journeyiq-journey-services.herokuapp.com';
/* const API = 'http://localhost:3006'; */
const Auth_API = 'https://journeyiq-auth-service.herokuapp.com/api';

const endpoint = API + '/api/session';

var domainId;

let str = window.navigator.userAgent
const plt = str.split(/[()]/)[1].split(" ");

let ip = null || sessionStorage.getItem('ip')
const locate = {} || JSON.stringify(sessionStorage.getItem('locationInfo'))

let Extraction = {}
/* 
setCookie('sessionID' , "UTz6qiaBbdAtN_7AGQg0uD_5JK77owFG"); */

async function check() {
  if (!getCookie('userID') && !getCookie('domainID')) {
    let info = await getIp();
    domainId = await getDomainID();
    setCookie('domainID', domainId);
    console.log('domainId', domainId);
    let sessionData = {
      "DomainID": domainId,
      "initialPageLoad": new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' }),
      "httpRefer": document.referrer,
      "homePage": window.location.href,
      "hostname": window.location.origin,
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

window.onload = async function (e) {
  await check();
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
  
  console.log(PageInformation)

  document.addEventListener('click', function (event) {
    try {

      console.log(event.target)
   
      var child = [];
      let tracker = {}

      if (event?.target?.nodeName === 'DIV') {
        let element = event.target.children

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
          value: event.target.innerHTML,
          className: event.target.className,
          src: event.target?.src,
          href: event.target?.href,
          alt: event.target?.alt,
          childNode: child
        }

      }
      else {
        tracker = {
          tagName: event?.target?.nodeName,
          value: event?.target?.innerHTML,
          className: event?.target?.className,
          src: event?.target?.src,
          href: event?.target?.href,
          alt: event?.target?.alt,
          childNode: child
        }

      }
      PageInformation.event.push(tracker);
      
    } catch (error) {
      console.error(error);
    }

  })

  window.addEventListener('beforeunload', async function (e) {
    sessionStorage.setItem('pre', this.document.URL)
    PageInformation.unloadTime = new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' })
    await UpdateUserSessionDetail(PageInformation)
  })

  await saveAllForms();
  await trackInputChanges();
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

/**
 * get domain id 
 */
async function getDomainID() {
  try{
    const result = await fetch(Auth_API + '/domain/getDomain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "domainUrl": window.location.origin
      })
    })
    let res = await result.json();
    if(Object.keys(res.data).length !== 0){
      console.log('domainSlug ', res.data.domainSlug);
      return res.data.domainSlug;
    }
  } catch(err){
    console.log(err);
  }
}

async function getIp() {
  const IP = getCookie('locationInfo')
  if (typeof IP == 'undefined') {
    let res = await fetch('https://ipinfo.io/json')
    let json = await res.json();
    console.log(json);
    const { country, region, city, ip, timezone } = json
    let data = {
      "country": country,
      "region": region,
      "timezone": timezone,
      "city": city,
      "ip": ip
    }
    sessionStorage.setItem('locationInfo', JSON.stringify(data));
    sessionStorage.setItem('ip', ip)
    return data;
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
  updatedCookie += ";target=/;sameSite=Lax";
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
  fetch(API + '/api/session/set_user_session'
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
  let res = await fetch(API + '/api/session/set_user_session'
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
  let res = await fetch(API + '/api/session/'
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
  let res = await fetch(API + `/api/session/get_user_session?sessionID=${sessionID}`
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

  const res = await fetch(API + '/api/session/update_user_session'
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

getCapFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 
 * @returns tracking all forms in a page
 */
function trackForms(){
  let form = document.getElementsByTagName("form"),
    formLength = document.getElementsByTagName("form").length,
    formName = "";
  let allFormInfo = [];
  for (let i = 0; i < formLength; i++) {
    formName = form[i].name;
    if (form[i].name == "" || form[i].name == null) {
      formName = form[i].id || form[i].className;
    }

    if (formName) {
      const title = getCapFirstLetter(document.title);
      const host = getCapFirstLetter(window.location.host);
      const getFields = getFormAllField(form[i]);
      allFormInfo.push({
        form: formName.replaceAll(' ', '-'),
        label: title + " | " + host + " form " + i,
        domainID: getCookie('domainID'),
        url: document.baseURI,
        fields: getFields
      });
    }
  }
  return allFormInfo
}

function getAllForms() {
  let form = document.getElementsByTagName("form"),
    formLength = document.getElementsByTagName("form").length;
  let allForms = [];
  for (let i = 0; i < formLength; i++) {
    let formName = form[i].name;

    if (formName == "" || formName == null) formName = form[i].id; // Form ID
    if (formName == "" || formName == null) formName = form[i].className; // Form class
    formName = formName.replaceAll(' ', '-');
    allForms.push(formName);
  }
  return allForms;
}

/**
 * @description Get Form Field
 */
function getFormAllField(elements) {
  let fields = [];
  for (var i = 0; i < elements.length; i += 1) {
    let event = elements[i];
    let fieldName = event.name; // Field Name
    let fieldType = event.type; // Field Type

    if (fieldType == 'hidden' || fieldType == 'submit') {
      continue;
    }

    // If field name is null
    if (fieldName == "" || fieldName == null) fieldName = event.id; // Field ID

    if (fieldName == "" || fieldName == null) fieldName = event.className; // Field class

    if (fields.indexOf(fieldName) == -1 && fieldName){
      const fieldData = {
        isChecked: false,
        name: fieldName.replaceAll(' ', '-'),
        label: ""
      }
      fields.push(fieldData);
    }
  }
  return fields;
}

/**
 * @description Track Input Changes
 */
async function trackInputChanges(elements, moreProperties) {
  var element = [];
  if (typeof elements === "undefined") {
    // elements = document.getElementsByTagName('select' || 'input');
    element = element.concat(Array.prototype.slice.call(document.getElementsByTagName('input')));
    element = element.concat(Array.prototype.slice.call(document.getElementsByTagName('select')));
    element = element.concat(Array.prototype.slice.call(document.getElementsByTagName('textarea')));
  }
  elements = element;
  for (var i = 0; i < elements.length; i += 1) {
    // On Input Change
    elements[i].addEventListener("change", (event) => {
      let form = event.target.form;
      let formName = form.name; // Form Name
      if (formName == "" || formName == null) formName = form.id; // Field ID
      if (formName == "" || formName == null) formName = form.className; // Field class
      formName = formName.replaceAll(' ', '-');
      // --------- All Form Data -----
      let allFieldData = {};
      for (let index = 0; index < form.length; index++) {
        const formElement = form[index];
        let formFieldName = formElement.name; // Field Name
        if (formFieldName == "" || formFieldName == null) formFieldName = formElement.id; // Field ID
        if (formFieldName == "" || formFieldName == null) formFieldName = formElement.className; // Field class
        formFieldName = formFieldName.replaceAll(' ', '-');
        if (formElement.type != 'submit' && formElement.value && formElement.type != 'password' && formElement.type != 'hidden') {
          allFieldData[formFieldName] = formElement.value;
        }
      }
      console.log(allFieldData, formName);
      if (event.target.type != 'password') {
        saveInputData(allFieldData, formName);
      }
    });
  }
}


saveAllForms = async () => {

  let form_fields = trackForms();
  console.log('form_fields', form_fields);

  fetch(API + '/api/form/store', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form_fields)
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}

function saveInputData(allFieldData, formName){
  fetch(API + '/api/form/saveInputData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "userID": getCookie('userID'),
      "sessionID": sessionStorage.getItem('sessionID'),
      "allFieldData": allFieldData,
      "formName": formName
    })
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}