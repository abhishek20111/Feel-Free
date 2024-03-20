import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  await connectToDatabase();

  const query = params.query; 

  try {
    const posts = await Post.find({
      $or: [
        { caption: { $regex: query, $options: 'i' } },
        { tag: { $regex: query, $options: 'i' } },
      ],
    }).populate('creator likes').exec();

    // Search for users with matching first name or last name
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
      ],
    }).exec();

    return new NextResponse(JSON.stringify({ posts, users }), { status: 200 });
  } catch (error) {
    console.error('Error searching for posts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
