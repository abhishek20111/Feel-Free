import Post from "@/lib/models/post";
import User from "@/lib/models/user";
import { connectToDatabase } from '@/lib/dbConfig/dbConfig'

export const PUT = async (req, { params }) => {
  try {
    await connectToDatabase();

    console.log(params.userId);
    const myId = req.cookies.get('userID')?.value || ''
    const friendId = params.userId;
    console.log("Try to follow ",myId, friendId);
    const Myuser = await User.findByIdAndUpdate(myId,
      { $push: { following: friendId } },
      { new: true })

    const user = await User.findByIdAndUpdate(
      friendId,
      { $push: { followers: myId } },
      { new: true }).
      populate('savedPosts followers following')
      .exec();
console.log(user);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to get user" + err, { status: 500 });
  }
};