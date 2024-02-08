"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { uploadcloudnary } from "./upload.js";

function Posting() {
  const [link, setLink] = useState("");
  const [imageChange, setImageChange] = useState(null);

  const handleImageChange = (e) => {
    setImageChange(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      const { url } = await uploadcloudnary(imageChange);
      console.log(url);
      setLink(url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (imageChange !== null) {
      uploadImage();
    }
  }, [imageChange]);

  return (
    <>
      <div className="flex flex-col gap-7 pb-24">
        <div>
          <label className="pointer-events-none mr-2 text-black">Upload:</label>
          <input
            type="file"
            className="mx-2 rounded-md p-1"
            onChange={handleImageChange}
          />
        </div>
        <div>
          {link && (
            <div className="">
              <Image width={100} height={200} src={link} alt="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Posting;
