import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex lg:min-h-[98vh] min-h-screen h-auto gap-4 bg-gray-900 '>
     <div className='border rounded-xl border-gray-500 p-4 lg:w-1/6 w-2/6 flex flex-col justify-between '><Sidebar/></div>
     <div className='border rounded-xl border-gray-500 p-4  lg:w-5/6 w-4/6'><Outlet/></div>
    </div>
  )
}

export default Home
