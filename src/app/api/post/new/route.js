import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';

export const POST = async (req) => { // Modify function signature to accept req and res
    try {
        await connectToDatabase();
        const { formData} = await req.json();
        const { caption, postPhoto, tag , creator} = formData;
         
        const newPost = new Post({
            creator,
            caption,
            postPhoto,
            tag
        });
        await newPost.save({ new: true });
        console.log("Post successfully added to the database");
        return new Response(newPost, { status: 200 });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return new Response("Internal Server Error"+error , { status: 500 });
    }
};
