import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import useAuth from '../../Hooks/useAuth'
import { FORGOT_PASSWORD, login } from '../../api/api'
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiArrowBack } from 'react-icons/bi'


function Logintwo() {
  const navigate = useNavigate()
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { setAuth, Auth } = useAuth()

  

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  })

  const [errorMessage, setErrorMessage] = useState();

  const [forgot , setforgot] = useState(false)

  const inputHandler = (event) => {
    const { id, value } = event.target
    setUserCredentials(pre => {
      return {
        ...pre,
        [id]: value,
      }
    })
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(userCredentials)
    if (userCredentials.email && userCredentials.password) {
      try {

        const res = await axios.post(login, userCredentials)

        console.log(res);

        const { token } = res.data;

        const { fullName , email } = res.data.data
        console.log(res.data)
        localStorage.setItem('token', token)
        localStorage.setItem('username', fullName)
        localStorage.setItem('email', email)

        setAuth(() => {
          return {
            token: token,

          }
        })

        toast.success("Login Successfully" ,{ icon:""})

        const timeout = setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000);
        
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
        toast.error(errorMessage)
      }
    }
    else {
      setErrorMessage("Fields could not be empty");
      

    }

    
  }

  const forgotHandler = async (e) =>{
    e.preventDefault();
    
    if (userCredentials.email ) {
      try {

        const res =   await axios.post(FORGOT_PASSWORD,{email:userCredentials.email})

        console.log(res);

        setUserCredentials({
          email:""
        })

        toast.info("Reset Password Email Send Successfully" ,{ icon:""})

       

       
      }
      catch (err) {

        if (err?.response?.status === 400) {
          setErrorMessage("Invalid email or password");
        }
        else if (err?.response?.status === 401) {
          setErrorMessage("Unauthorized");
        }
        else {
          setErrorMessage('Something went wrong');
        }
        toast.error(errorMessage)
      }
    }
    else {
      setErrorMessage("Fields could not be empty");

    }
  }
  return (
    <div className='w-full h-full bg-cover flex flex-row font-primary justify-evenly bg-[url("/public/assests/img/login.png")]' style={{
      background: "rgb(255,255,255)",
      background: "linear-gradient(180deg, rgba(255,255,255,1) 9%, rgba(203,230,236,1) 77%, rgba(180,219,227,1) 91%)"
    }}>

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

      <div className='w-2/3 h-full  bg-bg-3 bg-auto bg-blue flex flex-row p-5' style={{ backgroundImage: "url('/assests/img/login.png')" , backgroundRepeat:'no-repeat' , backgroundPosition:'center' }}>
        <h1 className='text-3xl font-semibold text-sky-700 font-primary font-[#063970]'></h1>
      </div>

      
        <div className=' h-full flex flex-col justify-center items-center '>

        <h1 className='font-semibold text-cyan-900 mb-10 text-3xl font-primary'> WELCOME  </h1>
      

        
        {
        !forgot ?
        <>
        <form className='flex flex-col gap-4 justify-center w-fit text-center pb-10 pt-5 p-10 ' onSubmit={onSubmitHandler} >
        <h1 className='font-semibold text-sky-700 mb-4  text-2xl font-primary'>Login</h1>
          <div className='flex flex-col gap-1'>

            {/*   <label>Email*</label> */}
            <input className="border-l-4  border-sky-700  p-2 bg-white rounded  focus:outline-sky-600 focus:outline" placeholder=' example@example.com'
              type="email"
              id='email'
              onChange={inputHandler}
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            {/*    <label>Password*</label> */}
            <input className="border-l-4  border-sky-700  p-2 bg-white rounded focus:outline-sky-600 focus:outline " placeholder='password '
              type="password"
              id='password'
              onChange={inputHandler}
              required
            />
          </div>
          {/*  <div className="flex gap-2">
            <input type="checkbox" />
            <strong className='text-sm'>Remember me</strong>
          </div> */}{/* 
                <p className='text-sm'>Don't have account ? <a href='#'>signup</a></p> */}
          <button className="border p-2 bg-sky-700  font-semibold text-white rounded-md" type='submit' onClick={onSubmitHandler}>Login</button>
        </form>
        <p className='text-xs font-bold cursor-pointer' onClick={()=>setforgot(true)}>Forgot password ?</p>
        
        </>
        : 
         <>
          <h1>Forgot Password</h1>
          <p className=" flex  items-center text-[14px] text-blue-400 gap-2 px-2 cursor-pointer mb-6 " onClick={()=>setforgot(false)} > <BiArrowBack/> Go To Login</p>
          <form onSubmit={forgotHandler} className='flex flex-col gap-4'>
          <input className="border-l-4  border-sky-700  p-2 bg-white rounded  focus:outline-sky-600 focus:outline" placeholder='e.g. exmaple@gmail.com'
              type="email"
              id='email'
              value={userCredentials.email}
              onChange={inputHandler}
              required
            />
          <button className="border p-2 bg-sky-700  font-semibold text-white rounded-md" type='submit' onClick={forgotHandler}>Confirm Email</button>

          </form>
          </>
       

      }
      </div>

    </div>
  )
}

export default Logintwo