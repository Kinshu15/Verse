import React, { useState } from "react";
import waterfall from "../../assets/images/waterfall.jpg";

const RSidebar = () => {
  // const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-screen bg-gray-100 shadow-xl border-0 rounded-l-3xl p-4 items-center">
      <div className="w-full flex flex-col items-center mt-6 mb-4">
        <img className="w-full max-w-xs h-56 object-cover rounded-2xl shadow-lg border-4 border-white" src={waterfall} alt="nature" />
      </div>
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-2 mt-2 w-full max-w-xs flex-1 flex items-center justify-center">
        <p className="font-medium text-base text-gray-800 leading-relaxed text-center" style={{ fontSize: '1rem', margin: 0 }}>
          Through photography, the beauty of Mother Nature can be frozen in time. This category celebrates the magic of our planet and beyond — from the immensity of the great outdoors, to miraculous moments in your own backyard.
        </p>
      </div>
    </div>
  );
};

export default RSidebar;
