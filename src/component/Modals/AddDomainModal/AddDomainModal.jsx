import axios from 'axios'
import { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { CREATEUSERDOMAIN, CREATE_DOMAIN } from '../../../api/api'
import { Button } from '../../sharedComponent/Button/Button'
import RingLoader from '../../sharedComponent/RingLoader/RingLoader'

const AddDomainModal = ({ setClose }) => {
    const [loading, setLoading] = useState(false)
    const [domainSetting, setDomianSetting] = useState(
        {
            label: "",
            domain: ""
        }
    )
    const closeHandler = () => {
        setClose(true)
    }

    function HandleChange(e) {
        const val = e.target.value
        setDomianSetting(pre => {
            return (
                {
                    ...pre,
                    [e.target.id]: val
                }
            )
        })
    }


    function CreateScript() {
        setLoading(true)
        axios.post(CREATE_DOMAIN,
            { label: domainSetting.label, domain: domainSetting.domain })
            .then(data => {
                console.log(data)
                setLoading(false)
                setClose(true)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className="z-10 w-80 absolute select-none'">
            {
                !loading ?
                <div className="rounded-lg  bg-white text-sm">
                    <div className='flex flex-row justify-between rounded-t-lg  items-center p-4 pt-2 pb-2  bg-zinc-200'>
                        <h1 className=' font-semibold text-sky-800'>ADD DOMAIN</h1>
                        <MdOutlineClose onClick={closeHandler} className='cursor-pointer' />
                    </div>
                    <div className='p-4 flex flex-col gap-1 pb-0'>
                        <label className='font-medium'> Label</label>
                        <input id="label" className='border rounded p-2 border-sky-700 focus:outline-none' onChange={HandleChange} />
                        <label className='font-medium'>Domain</label>
                        <input id="domain" className='border rounded p-2 border-sky-700
                    focus:outline-none' onChange={HandleChange} />
                    </div>
                    <div className='w-full flex flex-row justify-end p-4'>
                        <Button callHandler={CreateScript}>Add</Button>
                    </div>

                </div>
                : <RingLoader/>
            }

        </div>
    )
}

export default AddDomainModal