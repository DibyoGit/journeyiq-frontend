import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';
import { GET_ALL_DOMAIN } from '../api/api';


import NavigationBar from './Navigator/NavigationBar'
import MenuPan from './sharedComponent/MenuPan'
import RingLoader from './sharedComponent/RingLoader/RingLoader';

/* const MenuPan = lazy(() => './sharedComponent/MenuPan') */



const CustomTost = () => {
    return (
        <div className='bg-lime-600  text-white p-4'>
            <p>Login Successfully</p>
        </div>
    )
}
function Layout() {

    const [options, setOptions] = useState([])
    const token = localStorage.getItem('token')
    const [isloading, setloading] = useState(null);


    async function GetDomains() {
        setloading(true)
        try {
            const { data } = await axios.get(GET_ALL_DOMAIN, {
                headers: {
                    authorization: token
                }
            })
            setOptions(data)
            setloading(false)

        } catch (error) {
            setloading(false)
            console.warn(error)
        }
    }

    useEffect(() => {

        GetDomains()

    }, [])

    return (
        <div className='flex flex-row h-full w-full bg-[#eff6ff] absolute ' >


            <NavigationBar />
            {
                !isloading && isloading != null ?
                    <section className='flex flex-col w-full  overflow-y-scroll'>

                        <MenuPan options={options} />

                      { /* Routing  */}

                        <Outlet />


                    </section >
                    : <RingLoader />


            }


        </div>
    )
}

export default Layout