

import Post from '@/lib/models/post';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConfig/dbConfig';


export const POST = async (req) => {
    try {
        const conn = await connectToDatabase();
        if(conn)console.log("DB connected already so post");

        const { pageSize, page } = await req.json();   
        const perPage = parseInt(pageSize, 10);
        const pageNum = parseInt(page, 10);
        const skip = (pageNum - 1) * perPage;

        // Fetch posts from MongoDB with pagination and sorting
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage)
            .populate("creator likes")
            .exec();
        return new NextResponse(JSON.stringify({ posts }), { status: 200 });
    } catch (error) {
        console.error("Error retrieving posts:", error);
        return new NextResponse("Internal Server Error: " + error, { status: 500 });
    }
};
