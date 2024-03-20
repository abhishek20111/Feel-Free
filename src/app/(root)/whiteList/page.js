"use client";
import React, { useEffect, useState } from 'react';
import ShowAllCard from '@/components/card/ShowAllCard';
import { GetSavePostData } from '@/lib/actions/No_action';
import { CookieID } from '@/lib/actions/feetch-post';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/loader/main_content_loader';

function WhiteList() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myId, setMyId] = useState();
  const { user, isLoaded } = useUser();

  const getSavePost = async () => {
    setLoading(true);
    console.log(myId);
    const response = await GetSavePostData(myId);
    console.log(response);
    setUserData(response);
    setLoading(false);
  };

  useEffect(() => {
    const getId = async () => {
      const userIDDD = await CookieID();
      if (userIDDD) setMyId(userIDDD.value);
    };
    getId();
  }, []);

  useEffect(() => {
    if (user && myId && userData.length === 0) {
        console.log("calling ");
        getSavePost();
    }
  }, [user, myId]);

  return (
    <div className="flex flex-col gap-10">
      {loading || !isLoaded ? (
        <Loader />
      ) : user && (
        <>
          {userData.length === 0 && myId ? (
            <h1 className="text-center w-full text-2xl">No Save Post</h1>
          ) : (
            <ShowAllCard userData={userData} getFeedPost={getSavePost} />
          )}
        </>
      )}
    </div>
  );
}

export default WhiteList;
