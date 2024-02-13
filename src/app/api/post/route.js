import Post from '@/lib/models/post';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConfig/dbConfig';

export const GET = async (req) => {
    try {
        await connectToDatabase();
        const posts = await Post.find().sort({ createdAt: -1 }).populate("creator likes").exec();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return new NextResponse("Internal Server Error" + error, { status: 500 });
    }
};
