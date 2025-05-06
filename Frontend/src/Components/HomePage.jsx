import React from 'react'
import Header from './Header'
import Posts from './Posts'
import Sidebar from './Sidebar'
import Activity from './Activity'
const HomePage = () => {
  return (
    <div> 
      <Header/>
      <div style={{display:"flex",justifyContent:'space-between'}}>
        <Sidebar/>
        <Posts/>
        <Activity/>
      </div>
      
      
    </div>
  )
}

export default HomePage
