"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation'
import Posting from '@/components/form/Posting';

function Post() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id');
  const updateCaption = searchParams.get('updateCaption');
  const updatePhoto = searchParams.get('updatePhoto');
  const updateTag = searchParams.get('updateTag');

  return (
    <div>
      <Posting id={id} updatePhoto={updatePhoto} updateCaption={updateCaption} updateTag={updateTag}/>
    </div>
  );
}

export default Post;
