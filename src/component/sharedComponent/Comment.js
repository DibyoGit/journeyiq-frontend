import { faker } from "@faker-js/faker";
import { FcComments } from "react-icons/fc";
import { IoIosEye } from "react-icons/io";
import { Button } from "./Button/Button";


export function Comment({ data }) {
    return (
        <section className="grid grid-cols-6">
            <div className="col-span-4  border-r flex flex-col">
                <div className="flex border-b p-2 items-center gap-2 rows-span-2">
                    <p className="h-10 w-10 justify-center bg-sky-400 m-0 rounded-full flex items-center">{data.result[0].Author[0]}</p>

                    <p className="text-sm">{data.result[0].Author}</p>
                </div>
                <div className="bg-white grow text-lg w-full flex items-center justify-center rounded-bl-lg">
                    <h3 className="w-80">{faker.random.words(15)}</h3>
                </div>

            </div>
            <div className="col-span-2">
                <div className="flex justify-between p-1 px-2 border-b ">
                    <div className="flex items-center gap-1"> <IoIosEye /> <p className="text">1.9K</p></div>
                    <div className="flex items-center gap-1"><FcComments /> <p className="text" >3.2K</p></div>
                </div>
                <div className="p-2  flex gap-2 ">
                    <input type="text" placeholder="type comment" className="p-2 shadow rounded w-full" />
                    <Button>Send</Button>
                </div>
                <div className="max-h-60 overflow-y-scroll bg-white rounded-br-lg">
                    {
                        data?.result?.map((com, i) => {
                            return (
                                <div className="p-2 border-b" key={i}>
                                    <div className="flex justify-between text-[10px]">
                                        <p className="">{com.Author}</p>
                                        <p className="text-[8px]">{com.date}</p>
                                    </div>
                                    <p className="w-52">{com.title}</p>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </section>
    )
}