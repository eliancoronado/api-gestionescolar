import React, { useState } from "react";

const Navbar = () => {
  return (
    <div className="w-8/12 h-14 rounded-full absolute z-10 top-6 left-1/2 -translate-x-1/2 bg-[#171717] flex items-center justify-between shadow-xl">
      <div className="w-1/3 h-full grid grid-cols-3 items-center p-2 gap-x-1">
        <div className="w-full h-full bg-[#FD853A] text-base text-white rounded-full flex items-center justify-center font-medium font-sans hover:cursor-pointer">
          Home
        </div>
        <div className="w-full h-full text-base text-white rounded-full flex items-center justify-center font-medium font-sans hover:cursor-pointer hover:bg-[#FD853A] transition-all">
          About
        </div>
        <div className="w-full h-full text-base text-white rounded-full flex items-center justify-center font-medium font-sans hover:cursor-pointer hover:bg-[#FD853A] transition-all">
          Services
        </div>
      </div>
      <div className="w-1/3 h-full flex items-center justify-center text-2xl text-white font-sans font-bold">
        SIZAE
      </div>
      <div className="w-1/3 h-full grid grid-cols-3 items-center p-2 gap-x-1">
        <div className="w-full h-full text-base text-white rounded-full flex items-center justify-center font-medium font-sans hover:cursor-pointer hover:bg-[#FD853A] transition-all">
          Resume
        </div>
        <div className="w-full h-full text-base text-white rounded-full flex items-center justify-center font-medium font-sans hover:cursor-pointer hover:bg-[#FD853A] transition-all">
          Project
        </div>
        <div className="w-full h-full text-base text-white rounded-full flex items-center justify-center font-medium font-sans hover:cursor-pointer hover:bg-[#FD853A] transition-all">
          Contact
        </div>
      </div>
    </div>
  );
};

export default Navbar;
