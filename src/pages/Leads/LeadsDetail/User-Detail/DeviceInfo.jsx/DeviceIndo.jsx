import Card from "../../../../../component/sharedComponent/Card/Card"
import { AiOutlineInfoCircle,AiOutlineClockCircle ,AiOutlineCalendar } from 'react-icons/ai'
import {TbWorld} from 'react-icons/tb'
import { IoLinkOutline } from 'react-icons/io5'
import moment from "moment";
import { useState } from "react";
import { BlockModal } from "../../../../../component/Modals/BlockModal/BlockModal";
import styles from '../../../../../global.module.scss'
import { AiFillUnlock , AiFillLock} from 'react-icons/ai'

function browserName (agent) {        switch (true) {
    case agent.indexOf("edge") > -1: return "MS Edge";
    case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
    case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
    case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
    case agent.indexOf("trident") > -1: return "MS IE";
    case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
    case agent.indexOf("safari") > -1: return "Safari";
    default: return "other";
}
}

export const DeviceInfo = ({deviceData , setUpdate }) => {
    const device = deviceData?.DeviceInformation
    const Browser = device && browserName(device?.toLowerCase())
    const [ modal , setModal] = useState()
    const [close, setClose] = useState(true);
    const data = {
        IP: deviceData?.locationInformation?.IP ,
        isBlock:!deviceData.priority
        
    }
   

    function ModalHandler(){
        setModal(<BlockModal  setClose={setClose} ipInfo={data} setUpdate={setUpdate}/>)
        setClose(false)
      }

      
    function convert(date) {
        return new moment(date).format('dddd, MMMM Do YYYY')
      }
    return (
       <div className="text-xs flex flex-col gap-2 ">
        {
        modal && !close ?
          <div className={styles.modalView}>
            <div className={styles.view}>
            {modal}
            </div>
          </div>
          : ""
      }
        <Card>
            <div className="p-4  flex flex-col gap-1 ">
                <div>
                    <div className="flex  flex-row  items-center gap-1 ">
                        <AiOutlineInfoCircle />
                        <h2>IP</h2>
                        
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-blue-500 ml-4">{deviceData?.locationInformation?.IP}  </p>
                      <button className=" p-1 rounded text-zinc-500 hover:scale-125 text-lg" onClick={ModalHandler}>{deviceData.priority?  <AiFillUnlock title="Unfilter"/> :<AiFillLock title="Filter"/>  }</button>
                    </div>
                    
                </div>
                <div>
                    <div className="flex  flex-row  items-center gap-1 ">
                        <AiOutlineClockCircle />
                        <h2>Timezone</h2>
                    </div>
                    <p  className="text-blue-500 ml-4">{deviceData?.locationInformation?.Timezone}</p >
                </div><div>
                    <div className="flex  items-center  flex-row gap-1 ">
                        <TbWorld/>
                        <h2>Browser Platform</h2>
                    </div>
                    <p  className="text-blue-500 ml-4">{Browser} </p >
                </div><div>
                    <div className="flex  items-center flex-row gap-1 ">
                        <AiOutlineInfoCircle />
                        <h2>Device Platform</h2>
                    </div>
                    <p  className="text-blue-500 ml-4">{deviceData.Platform}</p >
                </div>
                <div>
                    <div className="flex  items-center  flex-row  gap-1 ">
                        <AiOutlineCalendar />
                        <h2>Acquisition Date:</h2>
                    </div>
                    <p  className="text-blue-500 ml-4">{deviceData?.createdAt && moment(deviceData?.createdAt).calendar()}</p >
                </div>
                <div>
                    <div className="flex  items-center  flex-row  gap-1 ">
                        <IoLinkOutline />
                        <h2>Channel:</h2>
                    </div>
                    <p className="text-blue-500 ml-4">{deviceData.Referrer === ""  ?"Direct": deviceData.Referrer}</p >
                </div>
               
            </div>
        </Card>
        <div className="grid grid-rows-3 gap-1 ">
                    
                    <div className=" border p-4  rounded-md shadow-md  bg-white">
                        <h1 style={{ fontSize: "14px", fontWeight: "bolder", marginBottom: "10px" }}>User Interaction</h1>
                        <div style={{ fontSize: "12px", display: 'flex',  flexDirection:'column' ,gap: "20px" }}>
                            <span className="flex flex-col" ><strong>Session Start Time : </strong>{convert(deviceData?.createdAt)}</span>
                            <span className="flex flex-col" ><strong>Session End Time  : </strong>   {convert(deviceData?.UpdatedAt)}</span>

                        </div>
                    </div>
                  

                    <div className=" border p-4  rounded-md shadow-md  bg-white">
                        <h1 style={{ fontSize: "14px", fontWeight: "bolder", marginBottom: "10px" }}>Location Summary</h1>
                        <div style={{ fontSize: "12px", display: 'flex', gap: "20px" ,  flexDirection:'column'}}>
                            <span><strong>Country</strong> : {deviceData?.locationInformation?.Country}</span>
                            <span><strong>Region</strong> : {deviceData?.locationInformation?.Region}</span>
                            <span><strong>City</strong> : {deviceData?.locationInformation?.City}</span>
                        </div>
                    </div>
                    <div className=" border p-4 rounded-md shadow-md bg-white">
                        <h1 style={{ fontSize: "14px", fontWeight: "bolder", marginBottom: "10px" }}>Browser Informations</h1>
                        <div style={{ fontSize: "12px", display: 'flex', gap: "10px",  flexDirection:'column' }}>
                            <span><strong>Outer Width</strong> : {deviceData?.BrowserWidthHeight?.innerWidth}</span>
                            <span><strong>Inner Width</strong> : {deviceData?.BrowserWidthHeight?.outerWidth}</span>
                            <span><strong>Outer Height</strong> : {deviceData?.BrowserWidthHeight?.outerHeight}</span>
                            <span><strong>Inner Height</strong> : {deviceData?.BrowserWidthHeight?.innerHeight}</span>
                        </div>
                    </div>
                    </div>
    </div>
    )
}