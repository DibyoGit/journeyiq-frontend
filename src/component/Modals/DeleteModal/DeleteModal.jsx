import axios from "axios"
import { useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { DELETE_IP } from "../../../api/api"
import { Button } from "../../sharedComponent/Button/Button"
import RingLoader from "../../sharedComponent/RingLoader/RingLoader"


export const DeleteModal = ({ setClose, ipInfo ,setUpdate }) => {
    const [loading, setLoading] = useState(false)

    const closeHandler = () => {
        setClose(true)
    }
    console.log(ipInfo)

    function DeleteIP() {
        setLoading(true)
        axios.delete(`${DELETE_IP}?ip=${ ipInfo.IP }`,  ipInfo.IP )
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
        <div className="z-10 w-120 absolute select-none'">
            {
                !loading ?
                    <div className="rounded-lg  bg-white text-sm">
                        <div className='flex flex-row justify-between rounded-t-lg  items-center p-4 pt-2 pb-2  bg-zinc-200'>
                            <h1 className=' font-semibold text-sky-800'>Delete IP</h1>
                            <MdOutlineClose onClick={closeHandler} className='cursor-pointer' />
                        </div>
                        <div className='p-6 flex flex-col gap-1 pb-0'>
                            <h1 className=" font-md ">Are you sure you want to <strong> remove </strong>this <strong>{ipInfo?.IP}</strong> ?</h1>
                        </div>
                        <div className='w-full flex flex-row justify-end p-4 gap-2'>
                            <button className="p-2 bg-black text-white rounded " onClick={closeHandler}>close</button>
                            <Button callHandler={DeleteIP}>Delete</Button>
                        </div>

                    </div>
                    : <RingLoader />
            }

        </div>
    )
}