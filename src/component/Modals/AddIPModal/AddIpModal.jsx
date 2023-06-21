import axios from "axios"
import { useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { CREATEIpList } from "../../../api/api"
import { Button } from "../../sharedComponent/Button/Button"
import RingLoader from "../../sharedComponent/RingLoader/RingLoader"


const option = [
    {
        id: 1,
        name: "Filter IP",
        value: true
    },
    {
        id: 2,
        name: "Unfilter IP",
        value: false
    }
]


export const AddIPModal = ({ setClose  , setUpdate}) => {
    const [loading, setLoading] = useState(false)
    const [addIP, setIP] = useState(
        {
            IP: "",
            select: option[0].value
        }
    )
    const closeHandler = () => {
        setClose(true)
    }

    function HandleChange(e) {
        const val = e.target.value
        setIP(pre => {
            return (
                {
                    ...pre,
                    [e.target.id]: val
                }
            )
        })
    }
    function AddIP() {
        setLoading(true)
        axios.post(CREATEIpList,
            { "IP": addIP.IP, "blocked": addIP.select })
            .then(data => {
                setLoading(false);
                setUpdate(pre => !pre);
                setClose(true)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }
   

    return (
        <div className="z-10 w-80 absolute select-none'">
            {
                !loading ?
                    <div className="rounded-lg  bg-white text-sm">
                        <div className='flex flex-row justify-between rounded-t-lg  items-center p-4 pt-2 pb-2  bg-zinc-200'>
                            <h1 className=' font-semibold text-sky-700'>ADD Filter IP</h1>
                            <MdOutlineClose onClick={closeHandler} className='cursor-pointer' />
                        </div>
                        <div className='p-4 flex flex-col gap-4 pb-0'>
                            <div className="flex flex-col gap-1 ">
                                <label className='font-semibold'>IP</label>
                                <input id="IP" className='border rounded p-2  focus:outline-none focus:border-sky-700' onChange={HandleChange} />
                            </div>
                            <div className="flex flex-col gap-1 " >
                                <label className='font-semibold'>Select Listing</label>
                                <select className='bg-white border p-2 focus:outline-none focus:border-sky-700 text-md' id="select" onChange={HandleChange}>

                                    {
                                        option.map(option => {
                                            return (
                                                <option className='text-blue p-2 text-xs ' value={option.value} key={option.id}>
                                                    {option.name} 
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>


                        </div>
                        <div className='w-full flex flex-row justify-end p-4'>
                            <Button callHandler={AddIP}>Create </Button>
                        </div>

                    </div>
                    : <RingLoader />
            }

        </div>
    )
}