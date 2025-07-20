import React from 'react'
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpeg"
import { Button } from "@material-tailwind/react";
import live from "../../assets/images/live.png"
import smile from "../../assets/images/smile.png"
import addImage from "../../assets/images/addImage.png"
const Main = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar
            src={avatar}
            size="sm"
            variant="circular"
            alt="Avatar"
          ></Avatar>
          <form className="w-full">
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  className="outline-none w-full bg-white rounded-md"
                  placeholder="Whats on your mind"
                ></input>
              </div>
              <div className="mx-4">{/*preview image*/}</div>
              <div className="mr-4">
                <Button variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span>{/*put Progress bar*/}</span>
        <div className=" flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
            >
              <img className="h-10 mr-4" src={addImage} alt="addImage"></img>
            </label>
            <input
              id="addImage"
              type="file"
              style={{ display: "none" }}
            ></input>
            {/* <Button variant='text'>Upload</Button> */}
          </div>
          <div className="flex items-center">
            <img className="h-10 mr-4" src={live} alt="live"></img>
            <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Live
            </p>
          </div>
          <div className="flex items-center">
            <img className="h-10 mr-4" src={smile} alt="smile"></img>
            <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Feeling
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full ">{/* Posts */}</div>
      <div>{/*Reference for later*/}</div>
    </div>
  );
}

export default Main
