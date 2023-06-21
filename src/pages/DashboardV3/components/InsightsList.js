import React from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { MdOutlinePreview } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Expander } from '../../../component/sharedComponent/Expander'

export default function InsightsList({data , title }) {
  return (
    <div className="col-span-2 bg-white shadow-xl rounded-xl min-h-96   ">
                    <div className="flex flex-col  ">
                        <div className="flex flex-gap gap-2 p-3 border-b items-center">
                            <span className="bg-blue-400 text-white text-sm rounded-full w-6 h-6 p-2 flex justify-center items-center shadow-2xl hover:scale-110 cursor-pointer ease-in-out duration-300 ">{data.length}</span>
                            <h1 className=" text-lg ">{title}</h1>

                        </div>
                        <div className="grid grid-cols-1 gap-1 p-1 ">
                            {
                                data.map((data, idx) => {
                                    return (
                                        <Expander title={data.title} key={idx} >
                                            <div className="p-4 text-sm">
                                                {data.des}
                                            </div>
                                        </Expander>
                                    )
                                })
                            }

                        </div>

                        <div className="flex flex-row justify-start items-center ml-2 ">
                            <MdOutlinePreview className="text-blue-400 text-2xl" />
                            <Link to="/dashboard/feedback" className="text-left p-2 text-md font-md  text-blue-400 ">Explore More</Link>
                        </div>

                    </div>
                </div>
  )
}
