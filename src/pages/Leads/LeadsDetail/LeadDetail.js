
import axios from "axios"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GETUSERSESSION } from "../../../api/api"
import Breadcrumbs from "../../../component/sharedComponent/Breadcrumbs"
import Card from "../../../component/sharedComponent/Card/Card"
import { DeviceInfo } from "./User-Detail/DeviceInfo.jsx/DeviceIndo"
import { DemoSankey } from "./User-Detail/SessionInfo.jsx/DemoSankey"
import { SessionInfo } from "./User-Detail/SessionInfo.jsx/Sessioninfo"



var colors = [/* '#a6cee3', */ '#b2df8a', '#fb9a99', '#fdbf6f',
  '#cab2d6', '#ffff99', /* '#1f78b4', */ '#33a02c'];

var options = {
  sankey: {
    node: {
      colors: colors,
      labelPadding: 30,
      nodePadding: 80,
      label: {
        fontSize: 12,
        color: 'rgb(7 89 133)',
        bold: true,
      }
    },
    link: {
      colorMode: 'gradient',
      colors: colors
    }
  }
};
function LeadDetail() {

  const [SessionValue, setSetSessionValue] = useState({})


  const { sessionID } = useParams()



  const [graphData, setGraphData] = useState([])

  const [Journey, setJourney] = useState()

  const [update , setUpdate] = useState(false)

  const [sankeydata, setSanketData] = useState()

  let dumJourney = []
  let sankJourney = []

  const getUserSession = async () => {
    try {
      const { data } = await axios.get(`${GETUSERSESSION}?sessionID=${sessionID}`)
     
      setSetSessionValue(data)
    }
    catch (e) {
      console.log(e)
    }

  }


  const createChartData = async (data) => {
    const key = Object.keys(data[0]);
    const SankD = [];
    SankD.push(key)
    await data.map(val => {
   
      const value = Object.values(val)
 
          /*  let found =  */ SankD.filter(path => {
        
        return []
      })
      /*  if(!found) {
        
       } */
      SankD.push(value)

    })
    setSanketData(SankD)
   
  }
  function gen(val) {
    const sd = []
    for (let i = 0; i < val.length; i++) {
      const x = new moment(val[i].loadTime);
      const y = new moment(val[i].unloadTime)
      const interactionTime = parseFloat((moment.duration(y.diff(x))._milliseconds)/360).toFixed(2)

      let jour = {
        from: `${i + 1}: ${val[i].PageTitle} `,
        to: `${i + 2}: ${!(i === val.length - 1) ? val[i + 1].PageTitle : "LEFT"} `,
        "duration(in Minutes)": Number(interactionTime),
      }
   
      sd.push(jour)
    }
    
    return sd
  }
  async function journeyExtractor() {
    const val = SessionValue?.Navigation || [];
    let data = gen(val)
    await createChartData(data)
  }



  useEffect(() => {
    getUserSession()
  }, [update])

  useEffect(() => {


    journeyExtractor()


  }, [SessionValue])


  return (
    <div style={{ padding: "20px", paddingTop: "0px", display: 'flex', flexDirection: "column" }} className="gap-3">
      <div>
        <h1 className='text font-bold text-sky-800 mb-2 ' >Session Information</h1>
        <Breadcrumbs/>
        <div style={{ display: 'grid', gridTemplateColumns: "200px 950px", gap: "20px" }}>
          <DeviceInfo deviceData={SessionValue} setUpdate={setUpdate} />
          <SessionInfo sessionData={SessionValue} />

        </div>
      </div>
   {
     SessionValue?.Navigation &&
     <Card>
     <DemoSankey DATA={SessionValue} />
     </Card>
     

   }
     

  

    </div>





  )
}
export default LeadDetail

