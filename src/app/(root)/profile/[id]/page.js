"use client";

import Profile_Loading from '@/components/loader/Profile_Loading';
import Profile from '@/components/profile/Profile';
import { CookieID } from '@/lib/actions/feetch-post';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


function ProfileId() {
    const { id } = useParams();
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(true);
    const [searchPost, setsearchPost] = useState([]);
    const [searPeople, setsearchPeople] = useState([]);
    const [myId, setMyId] = useState();
    const [getDataAgain, setGetDataAgain] = useState(true);
    
    const getSearchedResult = async () => {
        const response = await axios.get(`/api/post/profile/${id}`);
        const data = response.data;
        console.log(data);
        
        const userIDDD = await CookieID();
        setMyId(userIDDD.value);
        setsearchPost(data.posts);
        setsearchPeople(data.user);
        setLoading(false);
    };
    

    useEffect(() => {
        getSearchedResult();
    }, [getDataAgain]);

    return (
        (loading || !isLoaded)
            ?
            <div >
                <Profile_Loading/>
            </div>
            :
            <div className='mt-4' >
                <Profile searchPost={searchPost} searchPeople={searPeople} user={user} myId = {myId} setGetDataAgain={setGetDataAgain}/>
            </div>
    )
}

export default ProfileId
