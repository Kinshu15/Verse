import React from "react";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full px-4 md:px-16 py-4 bg-white rounded-b-2xl shadow-md sticky top-0 z-50 border-b border-gray-100">
      <Link to="/">
        <div className="text-4xl font-extrabold font-roboto transition-transform duration-200 hover:scale-105">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-gradient-x">
            Verse
          </span>
        </div>
      </Link>
      <div className="flex justify-center items-center mx-auto">
        <NavLinks/>
      </div>
      <div>
        <UserLinks/>
      </div>
    </div>
  );
};

export default Navbar;