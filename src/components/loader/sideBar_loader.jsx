import React from "react";

function sideBar_loader() {
  return (
    <div className="animate-pulse flex flex-col sticky left-0 top-0 z-20 h-screen p-3 w-60 max-md:hidden dark:bg-gray-900 dark:text-gray-100 custom-scrollbar overflow-auto">
      <div className=" space-y-3">
        <div className="my-3  ">
          <h2 className="h-9 bg-gray-200 rounded-lg dark:bg-gray-800"></h2>
        </div>

        <div className="flex-1 ">
          <ul className="pt-2 pb-4 space-y-2 text-sm">
            <li className="flex">
              <div className="flex-shrink-0 ">
                <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <h1 className="h-10 ml-2 w-full bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 ">
                <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <h1 className="h-10 ml-2 w-full bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 ">
                <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <h1 className="h-10 ml-2 w-full bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 ">
                <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <h1 className="h-10 ml-2 w-full bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 ">
                <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <h1 className="h-10 ml-2 w-full bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 ">
                <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <h1 className="h-10 ml-2 w-full bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 ">
                <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <h1 className="h-10 ml-2 w-full bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center p-2 mt-5 space-x-4 ">
        <div className="flex-shrink-0 ">
          <span className="w-14 h-14 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
        </div>
        <h1 className="h-14 ml-1 w-full bg-gray-200 rounded-xl dark:bg-gray-700"></h1>
      </div>
    </div>
  );
}

export default sideBar_loader;
