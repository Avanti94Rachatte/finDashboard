import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import {API_PATHS} from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [error ,setError] = useState('')

  const { updateUser}= useContext(UserContext)

  const navigate = useNavigate();
  // Handle Login Form Submit
  const handleLogin = async(e)=>{
    e.preventDefault();
    if (!validateEmail(email)){
      setError ("Please enter a valid email address")
      return;
    }
    if(!password){
      setError("Please enter your password")
      return;
    }
    setError('')

    //Login API Call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      const {token, user}= response.data

      if(token){
        localStorage.setItem("token",token)
        updateUser(user)
        navigate("/dashboard");  
      }
    } catch (error) {
      if(error.response && error.response.data.message){
         setError(error.response.data.message)
      } else{
        setError("Something went wrong. Please try again.")
      }
    }
  }
  return (
    
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className=" text-xl font-semibold text-black">Welcome</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          Please enter your details to login
        </p>
        <form onSubmit={handleLogin}>
         <Input 
         type="text" 
         value={email}
         onChange={({target})=>setEmail(target.value)}
         label="Email Address" 
         placeholder="Enter your email" 
         className="" />
         <Input 
         type="password" 
         value={password}
         onChange={({target})=>setPassword(target.value)}
         label="password" 
         placeholder="Enter your password" 
         className="" />

          {error && 
          <p className="text-red-500 text-xs pb-2.5">{error}</p>
          }
          <button className="btn-primary" type='submit'>LOGIN</button>
        <p className="text-[13px] text-slate-800 mt-3">Don't have an account?{" "}
          <Link to ="/signup" className="text-primary font-medium underline">
          SignUp
          </Link>
        </p>
        
        </form>
        </div>
      </AuthLayout>
   
  )
}


export default Login
