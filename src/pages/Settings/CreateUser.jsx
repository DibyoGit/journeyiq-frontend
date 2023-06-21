import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CREATE_NEW_USER } from "../../api/api";
import { Button } from "../../component/sharedComponent/Button/Button";


export function CreateUser({ setModal }) {
    const token = localStorage.getItem('token')
    const [newUser, setNewUser] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState()
     console.log(newUser)

    function InputHandler(e) {
        e.preventDefault();
        const { id, value } = e.target;

        setNewUser((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (newUser.fullName && newUser.email && newUser.password) {
            try {

                const res = await axios.post(CREATE_NEW_USER, newUser,
                    {
                        headers: {
                            authorization: token
                        }
                    })

                console.log(res);

                console.log(res.data)

                setNewUser({
                    fullName: "",
                    password: "",
                    email: " "
                })



                toast.success("User Created Successfully", { icon: "" })

                setModal()

            }

            catch (err) {

              

                if (err?.response?.status === 400) {
                    setErrorMessage("Invalid email or password");
                }
                else if (err?.response?.status === 401) {
                    setErrorMessage("Unauthorized");
                }
                else {
                    setErrorMessage('login failed');
                }

                toast.error(errorMessage, { icon: "" })
            }
        }
        else {
            setErrorMessage("Fields could not be empty");

        }

    };

    return (
        <div className="p-6">
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
            <form className="flex flex-col gap-4 " onSubmit={submitHandler}>

                <div className="flex gap-2  items-center justify-between">
                    <label className="font-semibold text-sm">Full Name</label>
                    <input type="text" id="fullName" className="shadow-md  p-2 w-fit rounded focus:outline-none" placeholder="Full Name" onChange={InputHandler} value={newUser.fullName} />
                </div>
                <div className="flex gap-2  items-center justify-between">
                    <label className="font-semibold text-sm">Email</label>
                    <input id="email" type="email" placeholder="Email" className="shadow-md  p-2 w-fit rounded focus:outline-none" onChange={InputHandler} value={newUser.email} />
                </div>
                <div className="flex gap-2  items-center justify-between">
                    <label className="font-semibold text-sm ">Password</label>
                    <input id="password" type="text" value={newUser.password} onChange={InputHandler} placeholder="Password " className="shadow-md  p-2 w-fit rounded focus:outline-none" />
                   
                </div>
                <Button type="submit" callHandler={submitHandler}>Create User</Button>
            </form>

        </div>
    )
} 