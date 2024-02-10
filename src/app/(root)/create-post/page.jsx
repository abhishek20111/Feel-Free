"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation'
import Posting from '@/components/form/Posting';

function Post() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id');
  return (
    <div>
      <Posting id={id} />
    </div>
  );
}

export default Post;
