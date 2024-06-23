import React,{useState} from 'react';
import {Link ,useNavigate} from "react-router-dom";
import axios from 'axios';
import { useDispatch ,useSelector} from 'react-redux';
import { authAction } from '../store/auth.js';

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn === true){
   navigate('/');
  }
  const dispatch = useDispatch();
  const[data ,setData] = useState({username:"",password:""});
  const change = (e)=>{
    const {name ,value} =e.target;
    setData({...data,[name]:value});
  }

  const submit= async()=>{
   try {
    if(data.username === ""||data.password===""){
      alert("All fields are required");
    }
    else{
      const response = await axios.post("https://backend-1pz8.onrender.com/api/login",data);
      setData({username:"",password:""});
      console.log(response);
       localStorage.setItem('id',response.data.id);
       localStorage.setItem('token',response.data.token);
       dispatch(authAction.login());
       navigate('/');
    }
    
   } catch (error) {
  console.log(error);
   }
  }
  return (
    <div className=' h-[98vh] flex items-center justify-center'>
    <div className='p-4 w-fit rounded bg-gray-800'>
        <div className='text-2xl font-semibold '>LogIn</div>
        <input value={data.username} onChange={change} name="username" type="username" placeholder="username" required className='bg-gray-700 px-3 py-2 my-3 w-full rounded'/>
       
        <input value={data.password} onChange={change} name="password" type="password" placeholder="password" required className='bg-gray-700 px-3 py-2 my-3 w-full rounded'/>
        <div className=' flex-col w-full items-center'>
        <button onClick={submit} className='font-semibold bg-blue-400 rounded w-full mb-3 px-3 py-2 text-black'>Login</button>
        <Link to="/signup" className='text-gray-400 text-center hover:text-gray-200'>Not having an account? SignUp here</Link>
        </div>
    </div>
  </div>
  )
}

export default Login
