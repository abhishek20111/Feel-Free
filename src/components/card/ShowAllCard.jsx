"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react'
import PostCard from "@/components/card/PostCard";

function ShowAllCard({userData, getFeedPost}) {
    const { user } = useUser();
  return (
    <>
       {userData && userData.map((post,idx)=>(
          <PostCard
          key={idx} 
          post={post}
          creator={post.creator}
          loggedInUser={user}
          update={getFeedPost || ''}
          />
        ))}
    </>
  )
}

export default ShowAllCard
