import User from "@/lib/models/user";
import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    
    console.log(params.id);
    
    // Find the user by ID and populate all fields of related fields inside the 'Post' schema
    const user = await User.findById(params.id)
      .populate({
        path: 'savedPosts',
        populate: {
          path: 'creator',
          model: 'User'
        }
      })
      .populate({
        path: 'savedPosts',
        populate: {
          path: 'likes',
          model: 'User'
        }
      })
      .exec();

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse.json(user.savedPosts, { status: 200 });
  } catch (err) {
    console.error("Failed to get user:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
