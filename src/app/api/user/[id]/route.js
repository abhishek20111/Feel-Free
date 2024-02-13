import Post from "@/lib/models/post";
import User from "@/lib/models/user";
import {connectToDatabase} from '@/lib/dbConfig/dbConfig'

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    
    console.log(params);
    console.log(params.id);
    const user = await User.findOne({ clerkId: params.id })
      .populate({
        path: "savedPosts followers following"
      })
      .exec();
      console.log("Response it going of user"+user._id);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to get user"+err, { status: 500 });
  }
};