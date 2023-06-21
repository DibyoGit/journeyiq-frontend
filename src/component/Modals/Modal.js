import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import RingLoader from "../sharedComponent/RingLoader/RingLoader";


export function Modal ({children , close , title}){
    const [loading, setLoading] = useState(false)
    
    return(
        <section className="z-10 w-120 absolute select-none">
           {
                !loading ?
                    <div className="rounded-lg  bg-slate-100 text-sm">
                        <div className='flex flex-row justify-between rounded-t-lg  items-center p-4 pt-2 pb-2 border-b '>
                            <h1 className='text-lg font-semibold text-sky-800'>{title}</h1>
                            <MdOutlineClose onClick={() => close(false)} className='cursor-pointer' />
                        </div>
                        <div className=' flex flex-col gap-1 pb-0'>
                           {children}
                           </div>
                    </div>
                    : <RingLoader />
            }


        </section>
    )
}