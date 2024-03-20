import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';


// Backend: API Endpoint to Remove Saved Post
export const PUT = async (req, { params }) => {
    try {
        await connectToDatabase();

        const postId = params.postId;
        const userId = req.cookies.get('userID')?.value || '';

        console.log("Try to remove save or not ", userId, postId);

        // Find the user by their ID and update the savedPosts array
        const user = await User.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } }, { new: true });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: 'Post removed from saved successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error removing saved post:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
