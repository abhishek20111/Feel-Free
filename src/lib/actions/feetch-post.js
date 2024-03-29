"use server";

import Post from '@/lib/models/post';
import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import { cookies } from 'next/headers'

export async function fetchPost(page) {

  const pageSize = 8;
  try {
    await connectToDatabase();
    const perPage = parseInt(pageSize, 10);
    const pageNum = parseInt(page, 10);
    const skip = (pageNum - 1) * perPage;

    const posts = await Post.find()
                        .sort({ createdAt: -1 })
                        .populate("creator likes")
                        .skip(skip)
                        .limit(perPage)
                        .exec();

    console.log(posts);
    return posts;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}


export async function CookieID() {
  const cookieStore = cookies()
  const id = cookieStore.get('userID')
  // cookies().set('name', 'lee', { secure: true })
  return id;
}

export const Logout = async () => {
  try {
    const cookieStore = cookies()
    cookieStore.set('userID', '', { httpOnly: true, expires: new Date(0), secure: true })
    return;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

// export async function fetchPost(page) {
//   const perPage = 10;
//   const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-02-12&to=2024-02-12&sortBy=popularity&page=${page}&pageSize=${perPage}&apiKey=1ac2fd35770345dab551d4dfba05d36d`;
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }