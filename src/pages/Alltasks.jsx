import React,{useState,useEffect} from 'react'
import Card from '../Components/Home/Card';
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../Components/Home/InputData';
import axios from 'axios';

const Alltasks = () => {
  const[Data ,setData] =useState([]);
  const[updatedData ,setUpdatedData] =useState({id:"",title:"",description:"",dueDate:""});
  const[inputdiv ,setInputdiv] = useState("hidden");
  const headers = {id:localStorage.getItem('id'),Authorization:`Bearer ${localStorage.getItem('token')}`}
  useEffect(()=>{
    const fetch = async()=>{
          const response = await axios.get('https://backend-1pz8.onrender.com/api/get-all-tasks',{headers})
          setData(response.data.data);
    }
 if(localStorage.getItem('id') && localStorage.getItem('token')){

   fetch();
 }
     });
  return (
   <>
   
   <div>
      <div className='w-full flex justify-end p-4'>
        <button onClick={()=>setInputdiv("fixed")}><IoAddCircleSharp className='text-4xl text-gray-400 hover:text-gray-100 transition-all ease-in-out duration-200 hover:cursor-pointer'/></button>
      </div>
   {Data &&  <Card home={"true"} setInputdiv={setInputdiv} data={Data.tasks} setUpdatedData={setUpdatedData} />}  
      
    </div>
    <InputData inputdiv={inputdiv} updatedData={updatedData} setUpdatedData={setUpdatedData} setInputdiv={setInputdiv}/>
   </>
  )
}

export default Alltasks
