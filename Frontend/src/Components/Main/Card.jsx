import React from "react";

const Card = ({ name, img, status }) => {
  return (
    <div>
      <div className="relative">
        <img
          className="h-80 w-auto rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg"
          src={img}
          alt={name}
        ></img>
        <p className="absolute bottom-4 left-4 text-sm font-medium text-white no-underline leading-none">
          {name}
        </p>
      </div>
    </div>
  );
};

export default Card;
