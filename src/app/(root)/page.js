"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/main_content_loader";
import PostCard from "@/components/card/PostCard";

export default function Home() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setuserData] = useState();

  const getFeedPost = async () => {
    try {
      const response = await axios.get("/api/post");
      setuserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedPost();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {loading || !isLoaded ? (
        <Loader />
      ) : (
        <>
        {userData && userData.map((post)=>(
          <>
          <PostCard
          key={post._id} 
          post={post}
          creator={post.creator}
          loggedInUser={user}
          update={getFeedPost}
          />
          {console.log(post)}
          </>
        ))}
        </>
      )}
    </div>
  );
}
