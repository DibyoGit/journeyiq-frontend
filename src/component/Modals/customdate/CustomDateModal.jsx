import axios from 'axios';
import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { customLead } from '../../../api/api';

function CustomDateModal({ setClose , setMisLeadSummary, setLeadData}) {

    const [customDateto, setCustomDateto] = useState();
    const [customDateFrom, setCustomDateFrom] = useState();

    console.log(customDateto , customDateFrom )
    const token = localStorage.getItem('token');

    const closeHandler = () => {

        setClose(true);
    }


    const summaryHandler = async () => {

        const range = {
            "date": {
                "end": customDateFrom,
                "start": customDateto
            }
        }

        try {
            const { data } = await axios.post(customLead, range,
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            setMisLeadSummary(data[0]?.summary) ;
            setLeadData(data)
            console.log(data[0]?.summary) ;
           


        }
        catch (e) {
            console.log(e)
        }


        setClose(true);
    }


    return (
        <div className='  z-10 w-96 absolute select-none'>
            <div className='rounded-lg  bg-white text-sm'>
                <div className='flex flex-row justify-between rounded-t-lg  items-center p-4 pt-2 pb-2  bg-zinc-200'>
                    <h1 className=' font-semibold text-sky-800'>SELECT DATE RANGE</h1>
                    <MdOutlineClose onClick={closeHandler} className='cursor-pointer' />
                </div>
                <div className='flex flex-row justify-center text-xs p-2 mt-2 mb-2 select-none items-center '>
                    <div className=' m-2 '>
                        <p>From:</p>
                        <input type="date" className='border p-2 m-2 ml-0 focus:outline-none w-36 select-none'
                            placeholder='to' onChange={(e) => setCustomDateFrom(e.target.value)}
                            value={customDateFrom} />
                    </div>
                    <div className=' m-2'>
                        <p>To:</p>
                        <input placeholder='dd/mm/yyyy' type="date" className='border p-2 m-2 select-none ml-0 focus:outline-none w-36 '
                            onChange={(e) => setCustomDateto(e.target.value)}
                            value={customDateto}
                        />
                    </div>

                </div>
                <div className='flex flex-row justify-end  gap-2 p-2 border-t '>
                    <button className='p-1 pl-2 pr-2 bg-black rounded text-white' onClick={closeHandler}>close</button>
                    <button className='p-1 pl-2 pr-2 bg- rounded bg-sky-800 text-white' onClick={summaryHandler} >save</button>
                </div>
            </div>
        </div>
    )
}

export default CustomDateModal