"use client";
import { useUser } from "@clerk/nextjs";
import React, { useCallback, useEffect, useState } from "react";
import PostCard from "@/components/card/PostCard";
import { GetUser } from "@/lib/actions/No_action";

const ShowAllCard = React.memo(({ userData, getFeedPost }) => {
  const { user } = useUser();

  const [myData, setMyData] = useState([]);

  const getMyData = useCallback(async () => {
    const response = await GetUser(user.id);
    setMyData(response);
  }, [user.id]);

  useEffect(() => {
    getMyData();
  }, [getMyData]);

  return (
    <>
      {userData &&
        userData.map((post, idx) => (
          <PostCard
            key={idx}
            myId={myData._id}
            post={post}
            creator={post.creator}
            loggedInUser={user}
            update={getFeedPost || ""}
            getMyData={getMyData}
            myData={myData}
          />
        ))}
    </>
  );
});

export default ShowAllCard;
