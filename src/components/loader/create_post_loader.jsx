import React from "react";

function create_post_loader() {
  return (
    <div className="animate-pulse flex flex-col gap-7 pb-24 w-full ">
      <div className="w-[80%] flex flex-col m-auto my-12 cursor-progress">
        <h1 className="bg-gray-200 rounded-2xl h-[70dvh] w-full"></h1>
      </div>
    </div>
  );
}

export default create_post_loader;
