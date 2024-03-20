"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Loading } from '@/components/loader/Circle_Loader.jsx';
import { useUser } from '@clerk/nextjs';
import PostCard from "@/components/card/PostCard";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

function SearchQuery() {
  const { query } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [searchPost, setsearchPost] = useState([]);
  const [searPeople, setsearchPeople] = useState([]);
  const [toggle, setToggle] = useState(true);

  const getSearchedResult = async () => {
    const response = await axios.get(`/api/post/search/${query}`);
    const data = response.data;
    console.log(data);
    setsearchPost(data.posts);
    setsearchPeople(data.users);
    setLoading(false);
  };

  useEffect(() => {
    getSearchedResult();
  }, []);


  return (
    loading
      ?
      <div className='w-full mt-[12rem] sm:mt-[17rem] items-center justify-center flex'>
        <Loading />
      </div>
      :
      <div className='mt-4' >
        <div className=' w-full justify-center flex gap-x-4'>
          <div className='' onClick={() => setToggle(true)}>
            <Button variant={toggle ? "blackOne" : "outline"}>People</Button>
          </div>
          <div onClick={() => setToggle(false)}>
            <Button variant={toggle ? "outline" : "blackOne"}>Post</Button>
          </div>

        </div>


        {
          <div className='m-auto w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2'>
            {toggle && searPeople && searPeople.map((user1, idx) => (
              <div key={idx} className="flex gap-x-9 gap-y-5 ">
                <Link
                  href={`/profile/${user1._id}`}
                  className="flex gap-x-4"
                >
                  <Image
                    src={user1.profilePhoto}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <p className="text-small-semibold text-light-1">
                    {user1.firstName} {user1.lastName}
                  </p>
                  <p className="text-subtle-medium text-light-3">
                    @{user1.username}
                  </p>
                </div>
              </div>
            ))}
          </div>

        }


        {!toggle && searchPost && searchPost.map((post, idx) => (
          <PostCard
            key={idx}
            post={post}
            creator={post.creator}
            loggedInUser={user}
          />
        ))}
      </div>
  )
}

export default SearchQuery;
