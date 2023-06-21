import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { GET_USER_DETAIL, UPDATE_USER_DETAIL } from "../../api/api";
import { Button } from "../../component/sharedComponent/Button/Button";
import { usersetting } from "../../data/settings"
import { Password } from "./Password";
import { MdModeEditOutline, MdCancel } from 'react-icons/md'
import { toast, ToastContainer } from "react-toastify";
import RingLoader from "../../component/sharedComponent/RingLoader/RingLoader";

export const PersonalDetail = () => {
    const { form } = usersetting

    const [detail, setDetail] = useState({
        email:"",
        phoneNumber: "",
        fullName:"",
    })
    const [editDetail, setEditDetail] = useState({
        email: "",
        /*    phoneNumber: null, */
        fullName: "",
    })
    const [edit, setedit] = useState({
        fullName: false,
        phoneNumber: false
    })

    const [errorMessage, setErrorMessage] = useState();

    const [loading, setLoading] = useState(false)

    let userEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token')

    const getUser = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${GET_USER_DETAIL}/${userEmail}`, {
                headers: {
                    authorization: token
                }
            })

            setDetail(pre => {
                return data
            })

            setEditDetail(pre => {
                return data
            })

            setLoading(false)

        }
        catch (e) {
            console.log(e)

            setLoading(false)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()


        if (editDetail.fullName || editDetail.phoneNumber) {
            setLoading(true)
            try {

                const res = await axios.put(UPDATE_USER_DETAIL,
                    {
                        fullName: editDetail.fullName,
                        email: editDetail.email
                    },
                    {
                        headers: {
                            authorization: token
                        }
                    })

                setedit({
                    fullName: false,
                    phoneNumber: false
                })

                toast.success("Profile Updated Successfully", { icon: "" })
                setLoading(false)

            }

            catch (err) {

                setLoading(false)
                toast.error(err.message)
            }
        }
        else {
            toast.error("Fields could not be empty");

        }

    };

    useEffect(() => {
        getUser()

    }, [])


    function InputHandler(e) {
        e.preventDefault();
        const { id, value } = e.target;

        setDetail((prev) => ({
            ...prev,
            [id]: value,
        }));
    }



    function EditToogle(id) {

        setedit(pre => {
            return {
                ...pre,
                [id]: true

            }
        })
    }
    function CancelToogle(id) {

        setedit(pre => {
            return {
                ...pre,
                [id]: false

            }
        })
    }
    
    return (
        <div className="">
            <ToastContainer
                position="top-right"
                autoClose={500}
                newestOnTop={false}
                rtl={false}
                hideProgressBar
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />

            <div className='border-b pl-4 pb-4'>
                <div className="flex flex-col gap-8  gap-2 justify-between">
                    <div className="col-span-2 ">
                        <h2 className="text-lg" >{usersetting.title}</h2>
                        <p className="text-xs ">{usersetting.subtitle}</p>
                    </div>
                    <div className="">
                    {

                        !loading ?


                            <form onSubmit={submitHandler} className="w-1/3 gap-6 grid ">

                                <div className="flex flex-col gap-1">
                                    <label className="text-[14px]">{form[0].label}</label>
                                    <input type={form[0].type} id={form[0].id} value={detail.email} placeholder={form[0].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border " readOnly disabled />
                                </div>
                                <div className="flex flex-col gap-1">
                                <label className="text-[14px]">{form[1].label}</label>
                                                <input type={form[1].type} id={form[1].id} value={detail.fullName} placeholder={form[1].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border " onChange={InputHandler} />
                                             {/*    <MdModeEditOutline onClick={() => EditToogle("fullName")} className="text-2xl p-1 bg-sky-600 text-white rounded-full cursor-pointer" title="edit" /> */}
                                            </div>

                           {/* 
                                <div className="flex flex-col gap-1">
                                    <label className="text-[14px]">{form[1].label}</label>
                                    <input type={form[1].type} id={form[1].id}  value={detail.fullName} placeholder={form[1].placeholderValue} onChange={InputHandler} className="p-2 rounded-lg font-medium text-sm shadow border "  />
                                    
                                    {/*  {
                                        !edit.fullName ?
                                            <div className="flex items-center gap-2">
                                                <input type={form[1].type} id={form[1].id} value={detail.fullName} placeholder={form[1].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border " readOnly />
                                            <MdModeEditOutline onClick={() => EditToogle("fullName")} className="text-2xl p-1 bg-sky-600 text-white rounded-full cursor-pointer" title="edit" /> 
                                            </div>
                                            :
                                            <div className="flex items-center gap-2">
                                                <input type={form[1].type} id={form[1].id} value={editDetail.fullName} placeholder={form[1].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border " onChange={InputHandler} />
                                                <MdCancel onClick={() => CancelToogle("fullName")} className="text-2xl  bg-red-600 text-white rounded-full cursor-pointer" title="cancel" />
                                            </div>
                                    }
                                </div> */}






                                <div className="flex flex-col gap-1">
                                    <label className="text-[14px]">{form[2].label}</label>
                                    <input type={form[2].type} id={form[2].id} value={detail.phoneNumber} placeholder={form[2].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border " onChange={InputHandler} />
                                </div>

                                <Button type="submit" callHandler={submitHandler} className=""  >Update Detail</Button>

                            </form>
                            : <RingLoader />

                    }
                    </div>
                </div>

            </div>
            <Password />

        </div>

    )
}