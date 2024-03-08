"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Dot from "../../../public/assets/3_dot.png";
import User_Icon from "../../../public/assets/user_icon.png";

import Edit_Icon from "../../../public/assets/edit_con.png";
import Black_Heart from "../../../public/assets/black_heart.png";
import Red_Heart from "../../../public/assets/red_heart.png";
import Not_Save from "../../../public/assets/not_save.png";
import Yes_Save from "../../../public/assets/yes-save.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Delete from "./Delete";

function PostCard({ key, post, creator, loggedInUser, update }) {
  const LikedByCreator = post.likes && post.likes.includes(creator._id);
  const SaveByCreator =
    post.creator.savedPosts && post.creator.savedPosts.includes(key);

  function joinTags(tags) {
    return tags.join(" ");
  }



  return (
    <div className="m-auto w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
      <div className="flex flex-col gap-y-5">
        <div className="flex justify-between ">
          <Link href={`/profile/${creator._id}/posts`} className="flex gap-x-4">
            <Image
              src={creator.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-small-semibold text-light-1">
                {creator.firstName} {creator.lastName}
              </p>
              <p className="text-subtle-medium text-light-3">
                @{creator.username}
              </p>
            </div>
          </Link>

          {loggedInUser.id === creator.clerkId && (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Image
                    className="cursor-pointer"
                    src={Dot}
                    height={25}
                    width={25}
                    alt="Menu"
                  />
                </PopoverTrigger>
                <PopoverContent className="sm:w-40 w-20 rounded  bg-white">
                  <div className="flex flex-col gap-y-2 justify-center">
                    <div className="my-2 sm:block hidden">
                      <h4 className="font-semibold sm:text-xs text-slate-300">
                        Menu
                      </h4>
                    </div>
                    <div className="flex items-center sm:gap-4 cursor-pointer">
                      <Image
                        src={User_Icon}
                        height={30}
                        width={30}
                        alt="User Profile"
                      />
                      <h1 className="sm:block w-full hidden">Profile</h1>
                    </div>
                    <Link
                      href={{
                        pathname: "/create-post",
                        query: {
                          id: creator._id,
                          updatePhoto: post.postPhoto,
                          updateCaption: post.caption,
                          updateTag: joinTags(post.tag),
                        },
                      }}
                      className="flex items-center sm:gap-4 cursor-pointer"
                    >
                      <Image
                        src={Edit_Icon}
                        height={30}
                        width={30}
                        alt="Edit"
                      />
                      <h1 className="sm:block hidden">Edit</h1>
                    </Link>

                    <Delete id={post._id}/>
                    
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <div className="w-full flex gap-y-1 flex-col">
          <p className="text-body-normal font-semibold text-light-1 max-sm:text-small-normal">
            {post.caption}
          </p>
          <div className="bg-slate-200 flex items-center rounded-xl w-full h-[70vh] sm:p-2">
            <Image
              src={post.postPhoto}
              alt="post photo"
              width={1050}
              height={1000}
              className="rounded-lg m-auto max-h-full h-fit w-full sm:w-fit"
            />
          </div>
          <div className="flex flex-wrap">
            {post.tag.map((tag, index) => (
              <p
                key={index}
                className="font-extralight text-blue-500 text-xs  mr-2"
              >
                #{tag}
              </p>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="flex items-center cursor-pointer">
            {LikedByCreator ? (
              <Image src={Red_Heart} height={40} width={40} alt="Like" />
            ) : (
              <Image src={Black_Heart} height={40} width={40} alt="Dis-like" />
            )}
            <p className="text-xl cursor-default">
              {post.likes && post.likes.length}
            </p>
          </div>

          <div className="cursor-pointer">
            {SaveByCreator ? (
              <Image src={Yes_Save} height={40} width={40} alt="Save" />
            ) : (
              <Image src={Not_Save} height={40} width={40} alt="Not Save" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
