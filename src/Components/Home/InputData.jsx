import React,{useState,useEffect} from 'react';
import { MdDescription } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const InputData = ({inputdiv ,setInputdiv,setUpdatedData ,updatedData}) => {
const[Data ,setData] =useState({title:"",description:"",dueDate:""});
useEffect(()=>{
setData({title:updatedData.title,description:updatedData.description,dueDate:updatedData.dueDate});
},[updatedData])
const headers = {id:localStorage.getItem('id'),Authorization:`Bearer ${localStorage.getItem('token')}`}
const change =(e)=>{
const{name ,value} = e.target;
setData({...Data,[name]:value});
}
const submitDetail =async()=>{
  try {
    if(Data.title===''|| Data.dueDate==="" || Data.description===""){
      alert('All fiels are required');
    }
    else{
      await axios.post('https://backend-1pz8.onrender.com/api/create-task',Data,{headers});
      setData({title:"",description:"",dueDate:""});
      setInputdiv("hidden");
    }
  } catch (error) {
    console.log(error);
  }
}
const updateTask = async(id)=>{
  try {
    if(Data.title===''|| Data.dueDate==="" || Data.description===""){
      alert('All fiels are required');
    }
    else{
      await axios.put(`https://backend-1pz8.onrender.com/api/update-task/${updatedData.id}`,Data,{headers});
      setUpdatedData({id:"",title:"",description:"",dueDate:""});
      setData({title:"",description:"",dueDate:""});
      setInputdiv("hidden");
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <>
   <div className={`${inputdiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
   <div className={`${inputdiv}  top-0 left-0 flex items-center justify-center h-screen w-full`}>
    <div className='w-2/6 bg-gray-900 p-4 rounded'>
    <div className='flex justify-end'>
       <button 
       onClick={()=>{setInputdiv("hidden");
        setData({title:"",description:"",dueDate:""});
        setUpdatedData({id:"" ,title:"",description:"",dueDate:""})
        }
       } 
       className='text-2xl mb-4'> <RxCross2/></button>
    </div>
    <input onChange={change} value={Data.title} type="text" placeholder='Title' name="title" className='px-3 py-2 rounded w-full bg-gray-700' />
    <input onChange={change}
            type="date"
            value={Data.dueDate}
            name="dueDate"
            // onChange={(e) => setDueDate(e.target.value)}
            className="mt-3 block w-full px-3 py-2 text-gray-400 bg-gray-700 rounded "
            required
          />
    <textarea  onChange={change}  value={Data.description}  name="description"  rows="10" cols="30" className='px-3 py-2 rounded w-full bg-gray-700 my-3' placeholder="Enter description here.."/>
    {updatedData.id ===""? (<button onClick={submitDetail} className='rounded w-full px-3 py-2 bg-blue-400 text-black text-xl font-semibold'>Submit</button>):(<button onClick={updateTask} className='rounded w-full px-3 py-2 bg-blue-400 text-black text-xl font-semibold'>Update</button>)}
    
    
    </div>
   </div>
    </>
  )
}

export default InputData
