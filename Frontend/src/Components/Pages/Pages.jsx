import React from 'react'
import Home from './Home'
import {Routes,Route} from "react-router-dom"
import Login from './Login'
import Register from './Register'
import Reset from './Reset'
const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path='/Reset' element={<Reset/>}></Route>
      </Routes>
      
    </div>
  )
}

export default Pages
