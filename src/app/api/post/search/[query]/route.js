import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import Post from '@/lib/models/post';

export const POST = async (req, { params }) => {
    await connectToDatabase();
  
    const query = params.query; 
  
    try {
      const posts = await Post.find({
        $or: [
          { caption: { $regex: query, $options: 'i' } }, // $regex is an operator used to perform a regular expression search. It allows you to search for patterns within string fields.
          { tag: { $regex: query, $options: 'i' } }, //'i' stands for case-insensitive matching. It means the search will ignore the case of letters when matching the pattern
        ],
      }).populate('creator likes').exec();
  
      return new NextResponse(JSON.stringify({ posts }), { status: 200 });
    } catch (error) {
      console.error('Error searching for posts:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  };