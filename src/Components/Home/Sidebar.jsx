import React, { useEffect, useState } from 'react';
import {CgNotes} from 'react-icons/cg';
import {MdLabelImportant} from 'react-icons/md';
import {FaCheckDouble} from 'react-icons/fa6';
import {TbNotebookOff} from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/auth';
import axios from 'axios'; 

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const[Data ,setData] =useState([]);
    const data =[
        {
            "title":"All tasks",
            icon:<CgNotes/>,
            link:'/'
        },
        {
            "title":"Completed tasks",
            icon:<FaCheckDouble/>,
             link:'/completedtasks'
        },
        {
            "title":"Incompleted tasks",
            icon:<TbNotebookOff/>,
             link:'/incompletedtasks'
        },
        {
            "title":"Important tasks",
            icon:<MdLabelImportant/>,
             link:'/importanttasks'
        },
    ]
    const Logout =()=>{
      localStorage.clear('id');
      localStorage.clear('token');
      dispatch(authAction.logout());
      navigate('/signup');
    }
const headers = {id:localStorage.getItem('id'),Authorization:`Bearer ${localStorage.getItem('token')}`}
    useEffect(()=>{
   const fetch = async()=>{
         const response = await axios.get('https://backend-1pz8.onrender.com/api/get-all-tasks',{headers})
         setData(response.data.data);
   }
   if(localStorage.getItem('id') && localStorage.getItem('token')){

    fetch();
  }
    },[]);

  return (
    <div>
     {Data && (
      <div>
      <h2 className='text-xl font-semibold'>{Data.username}</h2>
      <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
      <hr/>
   </div>
     )}
     <div>
       {
        data.map((items,id) =>(<Link to={items.link} key={id} className='my-2 flex items-center gap-3  hover:bg-gray-500 p-2 rounded transition-all ease-in-out duration-200 cursor-pointer '>
    <span className='text-2xl'>{items.icon}</span>{items.title}
        </Link>)

        )
       }
     </div>
     <div>
        <button onClick = {Logout} className='bg-gray-600 p-2 rounded w-full'>Log Out</button>
     </div>
    </div>
  )
}

export default Sidebar
