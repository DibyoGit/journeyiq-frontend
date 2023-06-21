import moment from "moment"
import { useState } from "react"
import useCollapse from "react-collapsed"
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import Card from "./Card/Card"

export const Expander = ({ children, title  }) => {
    /* const Date = new moment(date).format("YYYY-MM-DD") */
    const [isExpanded, setOpen] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({
        isExpanded,
    })
    return (
        <>
            <div className="flex flex-row justify-between items-center text-sm bg-slate-100 border border-slate-200 p-2 shadow-sm pl-2 pr-2 rounded-md">
              
                <div className="flex items-center">
                  <p className="text-xs">{title}</p>

                    
                   
                </div>

                <button className=" shadow bg-white rounded-full p-2 hover:bg-white " {...getToggleProps({ onClick: () => setOpen((old) => !old) })}>
                    {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                </button>
               
            </div>
            
            <section {...getCollapseProps()} className=' rounded-md shadow-md bg-white pd-4  border'>{children}</section>
            
            

            </>
    )
}