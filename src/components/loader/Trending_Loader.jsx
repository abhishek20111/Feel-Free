import React from "react";

function Trending_Loader() {
  return (
    <div className="sticky right-0 top-0 z-20 animate-pulse h-screen w-[25rem] xl:w-[28rem] flex flex-col overflow-auto pl-6 pr-4 py-6 max-md:hidden">
      <div className="flex flex-col  justify-start">
        <h2 className=" h-11 rounded-xl bg-gray-300  mb-[1.5rem] w-1/2 "></h2>
      </div>

      <div className=" divide-y-2 mx-auto w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-2 max-sm:gap-2">
        <div className="flex gap-x-9 p-2 gap-y-5">
          <h1 className="w-16 h-16 rounded-full bg-gray-300"></h1>
          <h1 className="w-1/2 h-16 bg-gray-300 rounded-xl"></h1>
        </div>
        <div className="flex gap-x-9 p-2 gap-y-5">
          <h1 className="w-16 h-16 rounded-full bg-gray-300"></h1>
          <h1 className="w-1/2 h-16 bg-gray-300 rounded-xl"></h1>
        </div>
        <div className="flex gap-x-9 p-2 gap-y-5">
          <h1 className="w-16 h-16 rounded-full bg-gray-300"></h1>
          <h1 className="w-1/2 h-16 bg-gray-300 rounded-xl"></h1>
        </div>
        <div className="flex gap-x-9 p-2 gap-y-5">
          <h1 className="w-16 h-16 rounded-full bg-gray-300"></h1>
          <h1 className="w-1/2 h-16 bg-gray-300 rounded-xl"></h1>
        </div>
        <div className="flex gap-x-9 p-2 gap-y-5">
          <h1 className="w-16 h-16 rounded-full bg-gray-300"></h1>
          <h1 className="w-1/2 h-16 bg-gray-300 rounded-xl"></h1>
        </div>
        <div className="flex gap-x-9 p-2 gap-y-5">
          <h1 className="w-16 h-16 rounded-full bg-gray-300"></h1>
          <h1 className="w-1/2 h-16 bg-gray-300 rounded-xl"></h1>
        </div>
      </div>
    </div>
  );
}

export default Trending_Loader;
