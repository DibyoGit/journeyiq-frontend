import axios from "axios"
import { useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { UPDATEIpList } from "../../../api/api"
import { Button } from "../../sharedComponent/Button/Button"
import RingLoader from "../../sharedComponent/RingLoader/RingLoader"


export const BlockModal = ({ setClose, ipInfo ,setUpdate }) => {
    const [loading, setLoading] = useState(false)
    console.log(ipInfo)

    const closeHandler = () => {
        setClose(true)
    }
  console.log(ipInfo.IP)
    function BlockIP() {
        setLoading(true)
        axios.put(UPDATEIpList, { IP: ipInfo.IP, blocked: !ipInfo.isBlock })
            .then(data => {
                console.log(data)
                setLoading(false);
                setUpdate(pre => !pre);
                setClose(true)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
    }
    return (
        <div >
            {
                !loading ?
                    <div className="rounded-lg  bg-white text-sm">
                        <div className='flex flex-row justify-between rounded-t-lg  items-center p-4 pt-2 pb-2  bg-zinc-200'>
                            <h1 className=' font-semibold text-sky-800'>Change IP status</h1>
                            <MdOutlineClose onClick={closeHandler} className='cursor-pointer' />
                        </div>
                        <div className='p-6 flex flex-col gap-1 pb-0'>
                            <h1 className=" font-md ">Do you want to  {ipInfo?.isBlock ?  <strong>Unfilter</strong>  : <strong>Filter</strong>}  this <strong>{ipInfo?.IP}</strong> IP  ?</h1>
                        </div>
                        <div className='w-full flex flex-row justify-end p-4 gap-2'>
                            <button className="p-2 bg-black text-white rounded " onClick={closeHandler}>Close</button>
                            <Button callHandler={BlockIP}>{ipInfo?.isBlock ? "Unfilter" : "Filter"} IP</Button>
                        </div>

                    </div>
                    : <RingLoader />
            }

        </div>
    )
}