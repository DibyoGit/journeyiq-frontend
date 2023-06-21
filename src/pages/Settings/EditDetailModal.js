import { useState } from "react";
import { useRef } from "react";
import { Modal } from "../../component/Modals/Modal"


export const EditDetailModal = ({close}) =>{
    const [userDetail, setuserDetail] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        description: "",
        positions: "",
        password: "",
        place: "",
        email: "",
        date_of_birth: "",
        include: "",
    });

    const [message, setmessage] = useState("");
    const resetform = useRef();

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;

        setuserDetail((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    const submitHandler = async (e) => {

    };
    return(
        <Modal title="Edit User Detail" close={close}>
         <div className='border-b p-4'>
                <h1>{f1_setting.title}</h1>
                <div className='flex flex-col gap-4 p-4'>
                    {
                        f1_setting.form.map((fr, i) => {
                            return (
                                <div className='grid grid-cols-4 justify-center  items-center' key={i}>
                                    <label className='w-32 text-sm'>{fr.label}</label>
                                    <input className='p-2 shadow-md rounded col-span-2' type={fr.type} id={fr.id} placeholder={fr.placeholderValue} onChange={onChangeHandler} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='border-b p-4'>
                <h1>{f2_settings.title}</h1>
                <div className='flex flex-col gap-4 p-4'>
                    {
                        f2_settings.form.map((fr, i) => {
                            return (
                                <div className='grid grid-cols-4 justify-center  items-center' key={i}>
                                    <label className='w-32 text-sm'>{fr.label}</label>
                                    <input className='p-2 shadow-md rounded col-span-2' type={fr.type} id={fr.id} placeholder={fr.placeholderValue} onChange={onChangeHandler} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='border-b p-4'>
                <h1>{f3_settings.title}</h1>
                <div className='flex flex-col gap-4 p-4'>
                    {
                        f3_settings.form.map((fr, i) => {
                            return (
                                <div className='grid grid-cols-4 justify-center  items-center' key={i}>
                                    <label className='w-32 text-sm'>{fr.label}</label>
                                    <input className='p-2 shadow-md rounded col-span-2' type={fr.type} id={fr.id} placeholder={fr.placeholderValue} onChange={onChangeHandler} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Modal>
    )
}