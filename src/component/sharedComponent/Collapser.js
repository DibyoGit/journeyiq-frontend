import moment from "moment"
import { useState } from "react"
import useCollapse from "react-collapsed"
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import Card from "./Card/Card"

export const Collapser = ({ children, duration , date }) => {
    const Date = new moment(date).format("YYYY-MM-DD")
    const [isExpanded, setOpen] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({
        isExpanded,
    })
    return (
        <>
            <div className="flex flex-row justify-between  text-sm bg-slate-100 border border-slate-200 p-2 shadow-sm pl-2 pr-2 rounded-md">
              
                <div className="flex items-center">
                  <p>{Date}</p>

                    <div className=" ml-2 flex flex-row  items-center opacity-60">

                    {"("}
                    <p className="opacity-70">{duration}</p>
                    <p className="ml-2 mr-1 text-xs opacity-50">minutes</p> 
                    {")"}
                    </div>
                   
                </div>

                <button className="hover:animate-bounce  shadow bg-white rounded-full p-2 hover:bg-white transition delay-100 duration-300 ease-in-out" {...getToggleProps({ onClick: () => setOpen((old) => !old) })}>
                    {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                </button>
               
            </div>
            
            <section {...getCollapseProps()} className=' rounded-md shadow-md bg-white  border'>{children}</section>
            
            

            </>
    )
}