import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';

export const POST = async (req) => { // Modify function signature to accept req and res
    try {
        await connectToDatabase();
        console.log("here");
        const { formData} = await req.json();
        const { caption, postPhoto, tag , creator} = formData;
        console.log(postPhoto, caption, tag, creator);
         
        const newPost = new Post({
            creator,
            caption,
            postPhoto,
            tag
        });
        await newPost.save();
        console.log("Post successfully added to the database");
        return new Response("Post Successfully posted..", { status: 200 });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return new Response("Internal Server Error"+error , { status: 500 });
    }
};
