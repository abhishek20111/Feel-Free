"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PostCard from "@/components/card/PostCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Unfollow, followUser } from "@/lib/actions/No_action";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

function Profile({ searchPost, searchPeople, user, myId }) {
  const [toggle, setToggle] = useState(0);
  const { toast } = useToast();
  const [follow, setFollow] = useState(
    searchPeople &&
      searchPeople.followers.filter((follower) => follower._id === myId)
        .length > 0
  );
  const [userData, setUserData] = useState(searchPeople ? searchPeople : []);

  const handleFollow = async (e, OtherId) => {
    e.preventDefault();
    console.log("Follow ");
    const res = await followUser(OtherId);
    console.log(res);
    setUserData(res);
    setFollow(true);
    toast({
      variant: "success",
      title: `Followed to ${userData.firstName} ${userData.lastName}`,
    });
  };
  const handleUnFollow = async (e, OtherId) => {
    e.preventDefault();
    console.log("Unfollow");
    const res = await Unfollow(OtherId);
    console.log(res);
    setUserData(res);
    setFollow(false);
    toast({
      variant: "success",
      title: `Unfollowed to ${userData.firstName} ${userData.lastName}`,
    });
  };
  return (
    <div className="m-auto mt-5 w-full max-w-xl rounded-lg flex gap-4  max-sm:gap-2">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-around w-full border-gray-200 border-b-2">
          <div className=" h-[12rem]">
            <Image
              className=" w-[9rem] h-[9rem] ring-2 ring-offset-4 rounded-full object-cover"
              src={userData && userData.profilePhoto}
              height={2000}
              width={2000}
              alt="Profile Image"
            ></Image>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-small-semibold mx-5 sm:mx-0 text-light-1 flex w-[90%] sm:w-full justify-between">
              {userData.firstName} {userData.lastName}
              {myId !== userData._id && (
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {!follow ? (
                          <button
                            onClick={(e) => handleFollow(e, userData._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                            >
                              <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleUnFollow(e, userData._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                            >
                              <path d="M640-520v-80h240v80H640Zm-280 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                            </svg>
                          </button>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {!follow ? (
                          <div>Add Friend</div>
                        ) : (
                          <div>Remove Friend</div>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </p>
            <p className="text-subtle-medium mx-5 sm:mx-0 text-light-3">
              @{userData.username}
            </p>

            <div className="flex gap-x-3 items-center">
              <button
                onClick={() => setToggle(0)}
                className="flex flex-col justify-between w-full"
              >
                <p className="text-lg font-semibold text-gray-700 mx-auto">
                  {searchPost && searchPost.length ? searchPost.length : 0}
                </p>
                <p className="text-base sm:text-lg font-medium sm:font-semibold text-gray-300">Post</p>
              </button>
              <button
                onClick={() => setToggle(1)}
                className="flex flex-col justify-center w-full"
              >
                <p className="text-lg  font-semibold text-gray-700 mx-auto">
                  {userData && userData.followers.length}
                </p>
                <p className="text-base sm:text-lg font-medium sm:font-semibold text-gray-300">Followers</p>
              </button>
              <button
                onClick={() => setToggle(2)}
                className="flex flex-col justify-center w-full"
              >
                <p className="text-lg font-semibold text-gray-700 mx-auto">
                  {userData && userData.following.length}
                </p>
                <p className="text-base sm:text-lg font-medium sm:font-semibold text-gray-300">Following</p>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 my-3 justify-center ">
          <div
            onClick={() => {
              setToggle(0);
            }}
          >
            <Button variant={toggle === 0 ? "blackOne" : "outline"}>
              Post
            </Button>
          </div>
          <div
            onClick={() => {
              setToggle(1);
            }}
          >
            <Button variant={toggle === 1 ? "blackOne" : "outline"}>
              Followers
            </Button>
          </div>
          <div
            onClick={() => {
              setToggle(2);
            }}
          >
            <Button variant={toggle === 2 ? "blackOne" : "outline"}>
              Following
            </Button>
          </div>
        </div>

        <div>
          {toggle === 0 &&
            searchPost &&
            searchPost.map((post, idx) => (
              <PostCard
                myId={myId}
                key={idx}
                post={post}
                creator={userData}
                loggedInUser={user}
              />
            ))}
        </div>

        <div>
          {toggle === 1 && (
            <div className="m-auto w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
              {userData &&
                userData.followers.length > 0 &&
                userData.followers.map((user1, idx) => (
                  <div
                    key={idx}
                    className="border-b-2 pb-2 border-gray-200 flex gap-x-9 gap-y-5 "
                  >
                    <Link
                      href={`/profile/${user1._id}`}
                      className="flex gap-x-3"
                    >
                      <Image
                        src={user1.profilePhoto}
                        alt="profile photo"
                        width={5000}
                        height={5000}
                        className="rounded-full h-[5rem] w-[5rem] max-w-full"
                      />
                    </Link>
                    <div className="flex flex-col w-[53%] sm:w-[70%] gap-4">
                      <p className="text-small-semibold mx-5 sm:mx-0 text-light-1 flex w-[90%] sm:w-full justify-between">
                        <span className="">
                          {" "}
                          {user1.firstName} {user1.lastName}
                        </span>
                      </p>
                      <p className="text-subtle-medium text-light-3">
                        @{user1.username}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div>
          {toggle === 2 && (
            <div className="m-auto w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
              {userData &&
                userData.following.length > 0 &&
                userData.following.map((user1, idx) => (
                  <div
                    key={idx}
                    className="border-b-2 pb-2 border-gray-200 flex gap-x-9 gap-y-5 "
                  >
                    <Link
                      href={`/profile/${user1._id}`}
                      className="flex gap-x-3"
                    >
                      <Image
                        src={user1.profilePhoto}
                        alt="profile photo"
                        width={5000}
                        height={5000}
                        className="rounded-full h-[5rem] w-[5rem] max-w-full"
                      />
                    </Link>
                    <div className="flex flex-col w-[53%] sm:w-[70%] gap-4">
                      <p className="text-small-semibold mx-5 sm:mx-0 text-light-1 flex w-[90%] sm:w-full justify-between">
                        <span className="">
                          {" "}
                          {user1.firstName} {user1.lastName}
                        </span>
                        {console.log(myId, userData._id)}
                        {myId !== user1._id && myId === userData._id && (
                          <div className="ml-auto">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={(e) =>
                                      handleUnFollow(e, user1._id)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="24"
                                      viewBox="0 -960 960 960"
                                      width="24"
                                    >
                                      <path d="M640-520v-80h240v80H640Zm-280 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div>Remove Friend</div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </p>
                      <p className="text-subtle-medium text-light-3">
                        @{user1.username}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
