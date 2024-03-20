import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';

export const getUsersWithFollowers = async () => {
    try {
        await connectToDatabase();

        // Fetch all users from the database
        const allUsers = await User.find();

        return allUsers;
    } catch (error) {
        console.error("Error retrieving users with followers:", error);
        throw new Error("Internal Server Error: " + error);
    }
};

export const GET = async (req, { params }) => {
    try {
        const user = await getUsersWithFollowers();
        return new NextResponse(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
