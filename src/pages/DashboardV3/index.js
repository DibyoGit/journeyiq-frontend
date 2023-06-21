import { DashobardFakeData, feedback, Insights, productSummary } from "./components/fakeData";
import { IoAddCircle } from 'react-icons/io5'
import { Link } from "react-router-dom";
import Card from "../../component/sharedComponent/Card/Card";
import { CgFeed } from "react-icons/cg";
import { Collapser } from "../../component/sharedComponent/Collapser";
import { Expander } from "../../component/sharedComponent/Expander";
import { BiAddToQueue, BiArrowFromLeft } from "react-icons/bi";
import InsightsList from "./components/InsightsList";
import { useState } from "react";
import { MdOutlinePreview } from "react-icons/md";

export function Dashboard() {

    const [insight , setInsight] = useState(
        {
            insightTitle:`${DashobardFakeData[0].title} Insights`,
            insightData:DashobardFakeData[0].insight,
        }


    )

    const SelectHandler = (title, data) =>{
         setInsight(pre =>{
            return{
                insightData:data,
                insightTitle:title
            }
         })
    }

    return (
        <div className=" p-1  ">
            <div className="flex flex-row justify-between items-center pl-4">
             <h3 className="text-lg font-md">Dashobard</h3>
            <Link to="/dashboard/V1" className=" flex justify-end items-center text-[10px] text-blue-400 gap-2 px-2"> <BiArrowFromLeft /> Go to Dashboard-V1</Link>
            </div>
            <div className="flex flex-col p-4 gap-4   ">


                <div className=" grid grid-cols-3   gap-6">

                    {
                        DashobardFakeData.map((data, i) => {
                            return (
                                <div key={i} className={`flex flex-col justify-start rounded-lg   bg-white p-4 px-6 gap-1 shadow-lg `}>

                                    <h2 className="border-b-4 border-blue-400 w-fit text-xl">{data.title}</h2>

                                    <p className="text-xs opacity-70 ">{data.subtitle}</p>
                                    <div className="flex flex-col items-left my-2 gap-2">
                                        <span className="text-md  font-semibold  mb-0 ">{data.unit}</span>
                                        <h1 className=" text-3xl">{data.Value}</h1>
                                        
                                    </div>
                                    <div className="flex flex-row gap-2 justify-between h-fit">
                                        {
                                            data.analytics.map((ana, idx) => {
                                                let textColor = ana.inc ? "text-green-600" : "text-red-400"
                                                return (
                                                    <div className={`flex flex-col  items-center h-fit ${textColor}`} key={idx}>
                                                        <p className="text-xs text-black">{ana.title}</p>
                                                        <p className="text-xs max-w-24 text-center">{ana?.value}</p>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>

                                    <p className=" whitespace-normal grow text-xs my-2 max-h-16 opacity-50 text-ellipsis font-light">{data.summary} {/* <span id="dots" className="text-sky-600">... see more</span> */}</p>

                                    <p className="border-b-4 text-sm border-blue-400 my-2 pb-1">{data.sa}</p>
                                    <div className="flex flex-row justify-between w-full items-center gap-4">
                                        <button onClick={() => SelectHandler(`${data.title} Insights` , data?.insight )} className="bg-blue-400 text-white rounded-full w-8 h-8 p-2 flex justify-center items-center shadow-xl hover:scale-110 cursor-pointer ease-in-out duration-300 ">{data?.insight?.length} </button >
                                        <div className="flex flex-row items-center gap-2 ">
                                            <MdOutlinePreview className="text-blue-400 text-2xl" />
                                            <Link to={data.path} className="text-blue-400 text-md">Explore {data.title}</Link>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>


                <InsightsList data={insight.insightData} title={insight.insightTitle} />

                <div className="grid grid-cols-3  gap-6 ">


                    {
                        productSummary.map((det, i) => {
                            return (
                                <Card propsStyle="p-5 " key={i} >
                                    <div  >
                                        <h2 className=" border-blue-400 w-fit text-lg border-b-4 border-blue-400 mb-2">{det.title}</h2>
                                        <p className="text-xs opacity-40 ">{det.subtitle}</p>
                                        <div className="flex flex-row items-end my-2 gap-2">
                                            <h1 className=" text-3xl">{det.value}</h1>
                                            <span className="text-lg font-medium " >{det.unit}</span>
                                        </div>
                                        <div className="flex flex-col  leading-4 mt-2">
                                            <span className=" text-xs text-black ">{det.descTitle}  </span>
                                            <p className=" whitespace-normal text-sm text-ellipsis text-green-600 font-light">{det.desc} </p>
                                        </div>

                                       
                                        {
                                            det.insightDetail.map((ins, idx) => {
                                                return (
                                                    <div className="flex flex-row my-4 gap-2 border-b-4 text-sm border-blue-400 my-2 pb-1" key={idx}>
                                                        <IoAddCircle className="text-blue-400  text-2xl " />
                                                        <p className="leading-4 text-sm font-extralight ">{ins.value}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="flex flex-row justify-between w-full items-center">
                                        <button onClick={() => SelectHandler(`${det.title} Insight` , det?.insight )} className="bg-blue-400 text-white rounded-full w-8 h-8 p-2 flex justify-center items-center shadow-xl hover:scale-110 cursor-pointer ease-in-out duration-300 ">{det?.insight?.length} </button >
                                            <div className="flex flex-row items-center gap-2 ">
                                               <MdOutlinePreview className="text-blue-400 text-2xl" />
                                                <Link to={det.path} className="text-blue-400 text-md"> {det?.nav}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }

                    <Card propsStyle="bg-white flex items-center flex-col justify-center text-black">
                        

                        <h2 className="text-2xl mb-2">Add </h2>
                        <BiAddToQueue className="text-4xl"/>
                        
                    </Card>

                </div>

            </div>

        </div>
    )

}