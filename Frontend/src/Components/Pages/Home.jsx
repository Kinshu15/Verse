import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../LeftSidbar/Sidebar';
import RSidebar from '../RightSidebar/RSidebar';
import CardSection from "../Main/CardSection"
import Main from '../Main/Main';
const Home = () => {
  return (
    <div className='w-full'>
      
      <div className='fixed top-0 z-10 w-full bg-white'>
        <Navbar/>
      </div>
      <div className='flex bg-gray-100'>
        <div className='flex-auto w-[20%] fixed top-16'>
          <Sidebar/>
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl ">
          <div className='w-[80%] mx-auto'>
            <CardSection/>
            <Main/>
          </div>
        </div>
        <div className='flex-auto w-[20%] fixed right-0 top-16'>
          <RSidebar/>
        </div>
      </div>
    </div>
  )
}

export default Home
