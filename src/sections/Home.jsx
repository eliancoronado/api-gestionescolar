import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen bg-[#D0D5DD] flex flex-col items-center py-28 relative overflow-hidden">
      <div className="py-2 px-6 border-2 border-black rounded-full flex items-center justify-center font-medium font-sans text-sm">
        Hello!
      </div>
      <h1 className="text-7xl text-[#171717] font-sans font-semibold">
        I´m{""}
        <span className="text-[#FD853A]"> Sizae,</span>
      </h1>
      <h1 className="text-7xl text-[#171717] font-sans font-semibold">
        The Best Developer
      </h1>

      <div className="w-1/2 h-screen rounded-full bg-[#FEB273] absolute left-1/2 -translate-x-1/2 -bottom-2/3"></div>
      <div className=" w-48 absolute top-1/2 -translate-y-1/2 left-4 font-sans font-semibold text-[#344054]">
        "SIZAE’s Exceptional Full-Stack developer of our website’s success.
        Highly Recommended"
      </div>
      <div className=" w-48 absolute top-1/2 -translate-y-1/2 right-6">
        <p className="font-sans font-bold text-[#171717] text-3xl place-self-end">
          1 Years
        </p>
        <p className="font-sans font-normal text-[#171717] text-lg place-self-end">
          Experince
        </p>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 bg-[#D0D5DD] py-2 px-2 rounded-full bg-opacity-10 backdrop-blur-lg border border-white grid grid-cols-2">
        <div className="w-full h-full py-2 px-4 bg-[#FD853A] text-base text-white rounded-full flex items-center justify-center font-medium font-sans hover:cursor-pointer">
          Portfolio
        </div>
        <div className="w-full h-full flex items-center justify-center font-sans font-medium text-base text-white hover:cursor-pointer rounded-full hover:bg-[#FD853A]">
          Here me!
        </div>
      </div>
    </div>
  );
};

export default Home;
