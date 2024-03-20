import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';
import { NextResponse } from 'next/server';


export const PUT = async (req, { params }) => {
    try {
        await connectToDatabase();

        const postId  = params.likeId; 
        const userId = req.cookies.get('userID')?.value || ''; 
        
        console.log("Try to like or not ",userId, postId);
        const post = await Post.findById(postId);
        if (!post) {
            return new NextResponse(JSON.stringify({ message: 'Post not found' }), { status: 404 });
        }

        if (post.likes.includes(userId)) {
            return new NextResponse(JSON.stringify({ message: 'You already liked this post' }), { status: 400 });
        }

        post.likes.push(userId);
        await post.save();

        return new NextResponse(JSON.stringify({ message: 'Post liked successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error liking post:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
