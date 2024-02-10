import React, { useState, useEffect } from "react";
import Image from "next/image";
import { uploadcloudnary } from "./upload.js";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import delete_icon from "../../../public/assets/delete.png";
import Loading from "@/components/loader/create_post_loader.jsx";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation.js";

function Posting({ id, updatePhoto, updateCaption, updateTag }) {
  const [link, setLink] = useState(
    updatePhoto ||
      ""
  );
  const [imageChange, setImageChange] = useState(null);
  const { isLoaded } = useUser();
  const [updatePost, setupdatePost] = useState(false);
  const [loding, setLoding] = useState(true);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const handleImageChange = (e) => {
    setImageChange(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      setLoding(true);
      const { url } = await uploadcloudnary(imageChange);
      console.log(url);
      setLink(url);
      setLoding(false);
      return url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  const onUpdateSubmit = async (data) => {};

  const onSubmit = async (data) => {
    try {
      if (link) {
        setLoding(true);
        const tagsArray = data.tags.map((tag) => tag.tag.replace("#", ""));

        const formData = {
          creator: id,
          postPhoto: link,
          caption: data.caption,
          tag: tagsArray,
        };
        const response = await axios.post("/api/post/new", {formData});
        setLoding(false);
        router.push('/')
      } else {
        console.error("Image URL not available");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  useEffect(() => {
    if (imageChange !== null) {
      uploadImage();
    }
  }, [imageChange]);

  useEffect(() => {
    if (!updatePhoto && !updateCaption && !updateTag) {
      setLoding(false);
    } else {
      if (updatePhoto) setLink(updatePhoto);
      if (updateCaption) setValue("caption", updateCaption);
      if (updateTag) {
        updateTag.forEach((tag, index) => {
          setValue(`tags.${index}.tag`, tag);
        });
      }
      setupdatePost(true);
      setLoding(false);
    }
  }, [updatePhoto, updateCaption, updateTag]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      const isValidTag = /^#[^\s]+$/.test(value); // Check if value matches the pattern
      if (isValidTag && fields.length < 5) {
        append({ tag: value });
        setValue("newTag", "#");
      }
    }
  };

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-7 pb-24 w-full ">
          <div className="w-[80%] flex flex-col m-auto my-12">
            {link ? (
              <div className="bg-gray-200 rounded-2xl w-full">
                {link && (
                  <div className="w-full h-[60vh] relative">
                    <Image
                      className="absolute inset-0 w-full h-full object-contain p-2 rounded-2xl"
                      src={link}
                      alt="Photo"
                      height={400}
                      width={400}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center m-auto justify-center w-full ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={handleImageChange}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {link && (
              <div className="bg-slate-100  rounded-md p-3 m-4">
                <form
                  className="bg-slate-200 shadow-lg max-w-sm mx-auto p-4"
                  onSubmit={
                    updatePost
                      ? handleSubmit(onUpdateSubmit)
                      : handleSubmit(onSubmit)
                  }
                >
                  <div className="mb-5 space-y-4">
                    <label
                      htmlFor="large-input"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Caption
                    </label>
                    <textarea
                      type="text"
                      required
                      rows={10}
                      id="large-input"
                      className={`${
                        errors.caption
                          ? "border-red-500 dark:focus:border-green-500 focus:border-green-500"
                          : "border-gray-300"
                      }  block w-full p-4 text-gray-900 border  rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="Hi its my first post...😁"
                      {...register("caption", { required: true })}
                      style={{ overflow: "hidden", resize: "none" }} // Style to remove scrollbars and prevent resizing
                    />

                    {errors.caption && (
                      <span className="text-red-500 ">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="mb-5 flex flex-col">
                    {fields.length < 5 ? (
                      <>
                        <label
                          htmlFor="base-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tags
                        </label>
                        <input
                          id="base-input"
                          className={`bg-gray-50 border w-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                            errors.newTag ? "border-red-500" : ""
                          }`}
                          placeholder="#popular"
                          defaultValue="#"
                          {...register("newTag", {
                            
                            pattern: {
                              value: /^#[^\s]+$/, // Adjusted pattern to disallow spaces after #
                              message:
                                "Tag must start with # and have no spaces are allowed",
                            },
                          })}
                          onKeyDown={handleKeyDown}
                          value={watch("newTag")}
                        />
                        {errors.newTag && (
                          <span className="text-red-500 text-xs">
                            {errors.newTag.message}
                          </span>
                        )}
                      </>
                    ) : (
                      <h1 className="text-green-500 text-base">
                        At max 5 Tags
                      </h1>
                    )}

                    <div className="flex flex-col gap-y-1 my-3">
                      {fields.map((item, index) => (
                        <div key={item.id} className="flex w-fit">
                          <input
                            className="w-[40%] p-1 rounded"
                            type="text"
                            readOnly
                            {...register(`tags.${index}.tag`)}
                            defaultValue={item.tag}
                          />
                          <button
                            type="button"
                            className="mx-2"
                            onClick={() => remove(index)}
                          >
                            <Image
                              src={delete_icon}
                              height={15}
                              width={15}
                              alt="Remove"
                            ></Image>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {fields.length > 0 && (
                    <input
                      type="submit"
                      className="py-2.5 rounded m-auto px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    />
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Posting;
