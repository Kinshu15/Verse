import React ,{useRef,useState,useEffect,useContext}from "react";
import nature from "../../assets/images/nature.jpg";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpeg";
import job from "../../assets/images/job.png"
import location from "../../assets/images/location.png"
import Facebook from "../../assets/images/Facebook.png"
import twitter from "../../assets/images/twitter.png"
import { AuthContext } from "../AppContext/AppContext";
const Sidebar = () => {
  const [data,setData]=useState([])
  const count = useRef(0)
  const {user,userData} = useContext(AuthContext)
  return (
    
    <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col items-center relative">
        <img
          className="h-28 w-full rounded-r-xl"
          src={nature}
          alt="nature"
        ></img>
        <div className="absolute -bottom-4">
          <Tooltip content="profile" placement="top">
            <Avatar size="md" src={avatar} alt="avatat"></Avatar>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-6">
        <p className="font-sans font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
          {user?.email || userData?.email}
        </p>
        <p className="font-sans font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
          Access xclusive tools and insights
        </p>
        <p className="font-sans font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
          try premium for free
        </p>
      </div>
      <div className="flex flex-col pl-2">
        <div className="flex items-center pb-4">
          <img className="h-10" src={location} alt="location"></img>
          <p className="font-bold text-lg no-underline tracking-normal leading-none">
            Delhi
          </p>
        </div>
        <div className="flex items-center pb-4">
          <img className="h-10" src={job} alt="job"></img>
          <p className="font-bold text-lg no-underline tracking-normal leading-none">
            Developer
          </p>
        </div>
        <div className="flex items-center justify-center pt-4">
          <p className="font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Events
          </p>
          <p className="font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Groups 
          </p>
          <p className="font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Follow
          </p>
          <p className="font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            More
          </p>         
        </div>
      </div>
      <div className="ml-2">
        <p className="font-bold text-lg no-underline tracking-normal leading-none py-2">
          Social Profiles
        </p>
        <div className="flex items-center">
          <img className="h-10 mb-3 mr-2" src={Facebook} alt="Facebook"></img>
          <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-blue-500 no-underline tracking-normal leading-none py-2">
            Facebook
          </p>
        </div>
        <div className="flex items-center">
          <img className="h-10 mb-3 mr-2" src={twitter} alt="twitter"></img>
          <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-blue-500 no-underline tracking-normal leading-none py-2">
            Twitter
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
