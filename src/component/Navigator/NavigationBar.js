import React from 'react'
import Logo from '../sharedComponent/logo'
import { NavLink } from 'react-router-dom'
import { navs } from '../../data/navigationStacticData'
import { MdLogout } from 'react-icons/md'

function NavigationBar() {

    const LogoutHandler = () => {
        localStorage.removeItem('token');

    }
    return (
        <div className='text-slate-800 w-fit bg-[#0e5ba9] h-full p-2 flex flex-col gap-4 relative' >
           {/*  <Logo className='text-xs text-[#89b2d3]' /> */}
            {/*  <Avatar/> */}
            <div>
            {""}
                </div>
            <div className='text-lg text-white  flex flex-col justify-between h-full '>
                <div>


                    {
                        navs.map(navInfo => {
                            return (

                                <NavLink
                                    key={navInfo.id}
                                    to={navInfo.path}
                                    className={({ isActive }) => isActive ? " shadow-7xl text-neutral-200 bg-slate-100 " : ""}
                                    end >
                                    <div className='p-4 hover:bg-slate-100   border-slate-700 flex flex-col hover:text-[#0c5caa] hover:bg-sky-50 hover:rounded   pt-3 pb-3 gap-2 items-center'>
                                        <span className='text-3xl'>{navInfo.icons}</span>
                                        <p className='text-xs  text-center  '>{navInfo.name.toUpperCase()}</p>
                                    </div>


                                </NavLink>
                            )

                        })
                    }
                </div>
                <NavLink
                    to="/login"
                    onClick={() => localStorage.removeItem('token')}
                    className={({ isActive }) => isActive ? " shadow-7xl text-neutral-200 bg-slate-100  " : ""}
                    end >
                    <div className='p-4 hover:bg-slate-100  border-slate-700 flex flex-col hover:text-[#0c5caa] hover:bg-sky-50 hover:rounded   pt-3 pb-3 gap-2 items-center'>
                        <span className='text-3xl'> <MdLogout /></span>
                        <p className='text-xs  text-center '>Logout</p>
                    </div>


                </NavLink>
            </div>
        </div>
    )
}

export default NavigationBar