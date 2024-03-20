import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';
import { NextResponse } from 'next/server';

export const PUT = async (req, { params }) => {
    try {
        await connectToDatabase();

        const postId  = params.unlikeId; 
        const userId = req.cookies.get('userID')?.value || ''; 
        
        
        const post = await Post.findById(postId);
        if (!post) {
            return new NextResponse(JSON.stringify({ message: 'Post not found' }), { status: 404 });
        }

        if (!post.likes.includes(userId)) {
            return new NextResponse(JSON.stringify({ message: 'You have not liked this post' }), { status: 400 });
        }

        // Remove userId from likes array
        post.likes = post.likes.filter(id => id.toString() !== userId);
        await post.save();

        return new NextResponse(JSON.stringify({ message: 'Post unliked successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error unliking post:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
