import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { useSelector} from 'react-redux';


const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn === true){
   navigate('/');
  }
  
  
  const[data ,setData] = useState({username:"",email:"",password:""});
  const change = (e)=>{
    const {name ,value} =e.target;
    setData({...data,[name]:value});
  }

  const submit= async()=>{
   try {
    if(data.username === "" ||data.email==="" ||data.password===""){
      alert("All fields are required");
    }
    else{
      const response = await axios.post("https://backend-1pz8.onrender.com/api/sign-in",data);
      setData({username:"",email:"",password:""});
      console.log(response);
      navigate('/login');
    }
    
   } catch (error) {
  alert(error.response.data.message);
   }
  }
  return (
    <div className=' h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-fit rounded bg-gray-800'>
          <div className='text-2xl font-semibold '>Signup</div>
          <input value={data.username} onChange={change} name="username" type="username" placeholder="username" required className='bg-gray-700 px-3 py-2 my-3 w-full rounded'/>
          <input value={data.email} onChange={change} name="email" type="email" placeholder="email" required className='bg-gray-700 px-3 py-2 my-3 w-full rounded'/>
          <input value={data.password} onChange={change} name="password" type="password" placeholder="password" required className='bg-gray-700 px-3 py-2 my-3 w-full rounded'/>
          <div className=' flex-col w-full  items-center'>
          <button onClick={submit} className='font-semibold bg-blue-400 rounded w-full mb-3 px-3 py-2 text-black'>SignUp</button>
          <Link to="/login" className='text-gray-400 text-center hover:text-gray-200'>Already having an account? Login here</Link>
          </div>
      </div>
    </div>
  )
}

export default Signup
