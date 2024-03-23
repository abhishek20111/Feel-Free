import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export const PUT = async (req, { params }) => {
  await connectToDatabase();
  const id = params.id;

  const { caption, tag } = await req.json();
  try {
    const updatedPost = await Post.findOneAndUpdate({ creator: id }, { caption, tag }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await updatedPost.save();
    return new NextResponse(JSON.stringify({ updatedPost }), { status: 200 });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return new NextResponse("Internal Server Error" + error, { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    console.log(params.id);
    const post = await Post.findById(params.id)
      .populate("creator likes")
      .exec();

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Fail to get post by id", { status: 500 });
  }
};



export const DELETE = async (req,{params}) => {
  try {
    await connectToDatabase();

    const postId = params.id; // Assuming req.params.id contains the post ID
    console.log(postId);

    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    
    await User.updateMany(
      { savedPosts: postId }, 
      { $pull: { savedPosts: postId } } // Pull the post ID from the savedPosts array
    );

    return new NextResponse("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse("Internal Server Error" + error, { status: 500 });
  }
};