import React,{useEffect} from 'react';


import './App.css'
import Home from './pages/Home';
import {Routes ,Route,useNavigate} from 'react-router-dom';
import Alltasks from './pages/Alltasks';
import Completedtasks from './pages/Completedtasks';
import Incompletedtasks from './pages/Incompletedtasks';
import Importanttasks from './pages/Importanttasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useDispatch, useSelector} from 'react-redux';
import { authAction } from './store/auth';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
console.log(isLoggedIn);
useEffect(()=>{
  if(localStorage.getItem('id')&&localStorage.getItem('token')){
    dispatch(authAction.login());
  }
  else if(!isLoggedIn){
    navigate('/signup');
    }
},[isLoggedIn])
  return (
    <div className='bg-gray-900 text-white h-screen p-1 relative'>
        <Routes>
        <Route exact path="/" element={<Home/>}>
        <Route index element={<Alltasks/>}/>
          <Route path="/completedtasks" element={<Completedtasks/>}/>
          <Route path="/incompletedtasks" element={<Incompletedtasks/>}/>
          <Route path="/importanttasks" element={<Importanttasks/>}/> 
          </Route>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default App
