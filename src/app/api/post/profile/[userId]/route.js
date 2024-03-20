import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();
        const creatorId = params.userId;
        // console.log("dd "+ creatorId);

        const posts = await Post.find({ creator: creatorId }).populate('likes').sort({ createdAt: -1 }).exec();
        const user = await User.findById(creatorId).populate('savedPosts followers following').exec();
        
        if (posts.length > 0) {
            return new NextResponse(JSON.stringify({ posts, user }), { status: 200 });
        } else {
           return new NextResponse(JSON.stringify({ user }), { status: 200 });
        }
    } catch (error) {
        console.error('Error searching for posts by creator ID:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
