import React from 'react'
import { useNavigate } from 'react-router'

function Login() {
    const navigate = useNavigate()
    const LoginHandler = () =>{
       navigate('/')
    }
    return (
        <div className='bg-zinc-100 flex flex-row justify-center items-center w-full p-20 h-screen'>
            <form className='flex flex-col gap-4 border w-fit text-start pb-10 pt-10 p-20 bg-white rounded-lg' >
               {/*  <img src='https://accounts.wination.io/assets/images/logo.png' alt='logo' className='mb-2'/> */}
               <h3 className='text-3xl text-center '>JOURNEYIQ</h3>
                <div className='flex flex-col gap-1'>
                    <label>Email*</label>
                    <input className="border p-2 bg-slate-100 rounded" placeholder='e.g. exmaple@gmail.com' type="email" />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Password*</label>
                    <input className="border p-2 bg-slate-100 rounded " placeholder='password ' type="password" />
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <strong>Remember me</strong>
                </div>{/* 
                <p className='text-sm'>Don't have account ? <a href='#'>signup</a></p> */}
                <button className="border p-2 bg-slate-700 font-semibold text-white" type='submit' onClick={LoginHandler}>login</button>
            </form>
        </div>
    )
}

export default Login