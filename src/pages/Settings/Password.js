import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CHANGE_USER_PASSWORD } from "../../api/api";
import { Button } from "../../component/sharedComponent/Button/Button";
import { passwordsettings } from "../../data/settings";


export function Password() {
    const userEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const {form} = passwordsettings
    const [Resetpassword, setpassword] = useState({
        CurrPassword: "",
        newPassword: "",
        email: userEmail
    })

    const [errorMessage, setErrorMessage] = useState()

    const [reType, setReType] = useState("")

    function InputHandler(e) {
        e.preventDefault();
        const { id, value } = e.target;

        setpassword((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (Resetpassword.newPassword === reType) {
            if (Resetpassword.CurrPassword && Resetpassword.newPassword) {
                try {

                    const res = await axios.post(CHANGE_USER_PASSWORD, Resetpassword,
                        {
                            headers: {
                                authorization: token
                            }
                        })

                 

                    setpassword({
                        CurrPassword: "",
                        newPassword: "",
                        email: userEmail
                    })
                    setReType("")

                    setErrorMessage('')

                    toast.success('Password Changed Successfully', { icon: "" })

                }

                catch (err) {

                    if (err?.response?.status === 400) {
                        setErrorMessage("Invalid email or password");
                    }
                    else if (err?.response?.status === 401) {
                        setErrorMessage("Unauthorized");
                    }
                    else {
                        setErrorMessage('somethings went wront');
                    }
                    toast.success(errorMessage, { icon: "" })
                }
            }
            else {
                setErrorMessage("Fields could not be empty");

            }
        }
        else {
            setErrorMessage("Password don't match! ")
        }
    };

    

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


            <div className='border-b p-4'>
                <div className="flex flex-col gap-8  gap-4">
                    <div className="col-span-2 ">
                        <h2 >{passwordsettings.title}</h2>
                        <p className="text-xs ">{passwordsettings.subtitle}</p>
                        {
                          errorMessage &&  <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
                        }
                        
                    </div>
                    
                    <form onSubmit={submitHandler} className="col-span-2 gap-6 grid justify-left w-1/3  ">


                    
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px]">{form[0].label}</label>
                            <input type={form[0].type} id={form[0].id} placeholder={form[0].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border " onChange={InputHandler} value={Resetpassword.CurrPassword} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px]">{form[1].label}</label>
                            <input type={form[1].type} id={form[1].id} placeholder={form[1].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border "
                                onChange={InputHandler} value={Resetpassword.newPassword} />
                        </div>
                       
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px]">{form[2].label}</label>
                            <input type={form[2].type} id={form[2].id} placeholder={form[2].placeholderValue} className="p-2 rounded-lg font-medium text-sm shadow border "
                                value={reType} onChange={(e) => setReType(e.target.value)} />
                        </div>
                        <Button type="submit" callHandler={submitHandler} className="">Change Password</Button>

                    </form>
                </div>

            </div>

        </div>
    )
}