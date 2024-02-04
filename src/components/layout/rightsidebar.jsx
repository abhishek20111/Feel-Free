
function rightsidebar() {
  return (
    <div className="sticky right-0 top-0 z-20 h-screen w-[25rem] xl:w-[28rem] flex flex-col gap-12 overflow-auto pl-6 pr-4 py-6 max-lg:hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trending</h2>
        <button className="p-2 rounded-full bg-primary text-primary-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
          <div className="w-1/2 h-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default rightsidebar
