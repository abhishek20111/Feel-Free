import React from 'react'

function Profile_Loading() {
  return (
    <div className="m-auto mt-5 w-full max-w-xl rounded-lg flex gap-4  max-sm:gap-2">
        <div className="flex flex-col gap-y-5 w-full">
            <div className="flex gap-x-4 flex-row justify-around  border-gray-200 border-b-2">
                <h1 className='mb-2 h-[12rem] w-[12rem] rounded-full ml-[10px] sm:ml-2 bg-gray-300  dark:bg-gray-800'></h1>
                <div className='flex flex-col gap-4 text-small-semibold mx-5 sm:mx-0 text-light-1 w-[50%] justify-between'>
                    <div className='mt-4 flex flex-col gap-y-7'>
                    <h1 className='rounded-xl shadow-xl h-8 bg-gray-300 w-[80%] dark:bg-gray-400'></h1>
                    <h1 className='rounded-xl shadow-xl h-8 bg-gray-300 w-[80%] dark:bg-gray-400'></h1>
                    <h1 className='rounded-xl shadow-xl h-8 bg-gray-300 w-[80%] dark:bg-gray-400'></h1>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-5'>
            <h1 className="h-72 mx-auto bg-gray-300 w-[80%] rounded-2xl"></h1>
            <h1 className="h-72 mx-auto bg-gray-300 w-[80%] rounded-2xl"></h1>
            <h1 className="h-72 mx-auto bg-gray-300 w-[80%] rounded-2xl"></h1>
            <h1 className="h-72 mx-auto bg-gray-300 w-[80%] rounded-2xl"></h1>
            </div>
        </div>
      
    </div>
  )
}

export default Profile_Loading
