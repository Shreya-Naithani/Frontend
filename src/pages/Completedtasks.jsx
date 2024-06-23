import React,{useState,useEffect} from 'react';
import Card from '../Components/Home/Card';
import axios from 'axios';

const Completedtasks = () => {
  const [Data,setData]=useState();
  const headers = {id:localStorage.getItem('id'),Authorization:`Bearer ${localStorage.getItem('token')}`}
  useEffect(()=>{
    const fetch = async()=>{
          const response = await axios.get('https://backend-1pz8.onrender.com/api/get-complete-tasks',{headers})
          setData(response.data.data);
    }
 
    fetch();
     });
  return (
    <div>
       <Card home={"false"} data={Data}/>
    </div>
  )
}

export default Completedtasks
