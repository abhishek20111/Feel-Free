import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';



export const GET = async (req) => {
    try {
        console.log("hi there ");
        await connectToDatabase(); 
        const allUsers = await User.find(); 

        return new NextResponse(JSON.stringify({ user: allUsers }), { status: 200 });
      } catch (error) {
        console.error("Error retrieving users with followers:", error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
      }
};