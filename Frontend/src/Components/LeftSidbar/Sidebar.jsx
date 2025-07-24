import React ,{useRef,useState,useEffect,useContext}from "react";
import nature from "../../assets/images/nature.jpg";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpeg";
import job from "../../assets/images/job.png"
import location from "../../assets/images/location.png"

import { AuthContext } from "../AppContext/AppContext";
const Sidebar = () => {
  const [data,setData]=useState([])
  const count = useRef(0)
  const {user,userData} = useContext(AuthContext)
  return (
    
    <div className="flex flex-col min-h-screen h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg max-w-xs w-full mx-auto md:mx-0">
      <div className="relative flex flex-col items-center">
        <img
          className="w-full h-32 md:h-40 object-cover rounded-t-xl"
          src={nature}
          alt="nature"
        />
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
          <Tooltip content="profile" placement="top">
            <Avatar size="xxl" src={user?.photoURL || avatar} alt="avatar" className="border-4 border-white shadow-lg" />
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-16 pb-4 px-2">
        <p className="font-semibold text-base text-gray-800 text-center break-all">
          {user?.email || userData?.email}
        </p>
        <p className="font-medium text-sm text-gray-600 text-center mt-1">
          Access xclusive tools and insights<br />try premium for free
        </p>
      </div>
      <div className="flex flex-col gap-4 px-4 mt-2">
        <div className="flex items-center bg-gray-100 rounded-xl p-3 shadow-sm">
          <img className="h-8 w-8 mr-3" src={location} alt="location" />
          <span className="font-bold text-lg text-gray-800">Delhi</span>
        </div>
        <div className="flex items-center bg-gray-100 rounded-xl p-3 shadow-sm">
          <img className="h-8 w-8 mr-3" src={job} alt="job" />
          <span className="font-bold text-lg text-gray-800">Developer</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
