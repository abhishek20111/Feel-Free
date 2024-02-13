import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';

export const POST = async (req, {params}) => { // Modify function signature to accept req and res
    try {
        await connectToDatabase();
        const id = params.id;
        const post = await Post.findById(id).populate("creator likes").exec();

        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return new Response("Internal Server Error"+error , { status: 500 });
    }
};
