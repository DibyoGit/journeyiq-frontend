import { MdOutlineClose } from "react-icons/md"
import parse from 'html-react-parser';

export const EventInfo = ({ data, setClose }) => {
    const closeHandler = () => {
        setClose(true)
    }
  
    return (
        <div className="z-10 absolute select-none w-96  max-w-screen-md">
            <div className="rounded-lg  bg-white text-sm ">
                <div className="flex items-center justify-between p-3 border-b border-slate-200  ">
                    <h1 className="text-lg  font-bold">Events Information</h1>
                    <MdOutlineClose onClick={closeHandler} className='cursor-pointer' />
                </div>
                <div className="  max-h-96 overflow-y-scroll" >
                    {
                        data?.map((eve, idx) => {
                            const { value, className, alt, src ,  href } = eve
                            function Changer(tagName) {
                                switch (tagName) {
                                    case "A":
                                        return "Link"
                                    case "IMG":
                                        return "Image"

                                    case "DIV":
                                        return "Content Viewer"

                                    case 'P':
                                        return "TEXT"

                                    case 'B':
                                            return "HIGHLIGHTED TEXT"          

                                    default:
                                        return tagName
                                }
                            }
                            return (
                                <div className="border-t border-slate-200 p-2  ">
                                    <h1 className="p-1 font-semibold ">{Changer(eve?.tagName)}</h1>
                                    <ul className="text-sm pl-2">
                                        {
                                              eve?.tagName != "DIV" ?

                                        <>
                                        {value && <li><strong className="text-xs" > Value :</strong>{value}</li>}
                                        { href && <li><strong className="text-xs" > Url:</strong>{ href}</li>}
                                        {className && <li><strong className="text-xs"> Class :</strong>{className}</li>}
                                        {alt && <li><strong className="text-xs"> Alternate Value:</strong>{alt}</li>}
                                        {src && <li><strong className="text-xs"> Image Path :</strong>{src}</li>}
                                        </>
                                        :<div className="">
                                            
                                            {
                                              
                                                parse(value)
                                               
                                            }
                                        </div>
                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}