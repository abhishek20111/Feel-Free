import Post from "@/lib/models/post";
import User from "@/lib/models/user";
import {connectToDatabase} from '@/lib/dbConfig/dbConfig'
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    
    console.log(params.id);
    const user = await User.findOne({ clerkId: params.id })
      .populate("savedPosts followers following")
      .exec();
      console.log("Response it going of user"+user._id);
      const response = NextResponse.json(user, { status: 200 });
      response.cookies.set("userID", user._id, { httpOnly: true, secure: true });
    return response;
  } catch (err) {
    console.error(err);
    return new Response("Failed to get user"+err, { status: 500 });
  }
};