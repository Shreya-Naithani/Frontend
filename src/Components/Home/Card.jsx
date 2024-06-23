import React, { useEffect, useState } from 'react';
import {CiHeart} from 'react-icons/ci';
import {FaHeart} from 'react-icons/fa';
import {FaEdit} from 'react-icons/fa';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import TaskDetailModal from './TaskDetailModal';

import axios from 'axios';


const Card = ({home,setInputdiv,data,setUpdatedData}) => {
   const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
    // const[importantButton ,setImportantButton]=useState('false');
    const headers = {id:localStorage.getItem('id'),Authorization:`Bearer ${localStorage.getItem('token')}`}
    const handleCompleteTasks = async(id)=>{
        try {
         const response = await axios.put(`https://backend-1pz8.onrender.com/api/update-complete-task/${id}`,{},{headers});
      
        } catch (error) {
         console.log(error);
        }
     }

     const handleImportant = async(id)=>{
        try {
         const response = await axios.put(`https://backend-1pz8.onrender.com/api/update-imp-task/${id}`,{},{headers});
      
        } catch (error) {
         console.log(error);
        }
     }
    
     const deleteTask = async(id)=>{
        try {
         const response = await axios.delete(`https://backend-1pz8.onrender.com/api/delete-task/${id}`,{headers});
      
        } catch (error) {
         console.log(error);
        }
     }
     const handleUpdate =async(id,title,description,dueDate)=>{
        setInputdiv('fixed');
       setUpdatedData({id:id,title:title,description:description,dueDate:dueDate})
        //    try {
        //     const response = await axios.put(`http://localhost:3000/api/update-task/${id}`,{headers});
        //    } catch (error) {
        //     console.log(error);
        //    }
     }
     const handleView = (task) => {
      setSelectedTask(task);
      setShowModal(true);
    };
   
    
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  p-4 gap-4'>
   {
    data && data.map((item,id)=>(
        <div key={id} className=' bg-gray-800 rounded-sm p-4 '>
         <h3 className='text-xl font-semibold'>{item.title}</h3>
         <h3 className='text-gray-400'>Due date : {item.dueDate}</h3>
         <p className='break-words text-gray-300 my-2'> {item.description.length>25? item.description.slice(0,25)+ "...." :item.description}</p>
         <div className='mt-4 w-full flex items-center'>
            <button onClick={()=>handleCompleteTasks(item._id)} className={`${item.complete===false? "bg-red-400" :"bg-green-400" } px-2 py-1  rounded w-2/6`}>{item.complete===true ? "Completed" : "Pending"}</button>
            <div className='w-4/6 text-white p-2 ml-6 flex  text-2xl gap-3'>
             <button onClick={()=>handleImportant(item._id)} className='hover:scale-110'>{item.important === false ?( <CiHeart/>):(<FaHeart className='text-red-500'/>)}</button>
             <button onClick={()=>handleView(item)} className='hover:scale-110'><GrView/></button>
           {home !== "false" && (  <button onClick={()=>handleUpdate(item._id,item.title,item.description,item.dueDate)} className='hover:scale-110'><FaEdit/></button>)}
             <button onClick={()=>deleteTask(item._id)} className='hover:scale-110'><MdDelete/></button>
            </div>
            </div>
        </div>
    ))
   }
   {home === "true" &&  (
 <button onClick={()=>setInputdiv("fixed")} className='bg-gray-800 rounded-sm p-4 flex flex-col  hover:cursor-pointer justify-center  items-center text-gray-300'>
 <IoAddCircleSharp className='text-5xl h-[13vh]'/>
    <h2 className='text-2xl '> Add Task</h2>
</button>
   )}
    <TaskDetailModal showModal={showModal} setShowModal={setShowModal} task={selectedTask} />
    </div>
  )
}

export default Card
