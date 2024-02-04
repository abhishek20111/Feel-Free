import {connectToDatabase}  from '@/lib/dbConfig/dbConfig'
import User from '@/lib/models/user'

export async function GET(req) {
try {
    await connectToDatabase();
    console.log("Connected to the database");

    // Add sample user data
    const sampleUser = new User({
      clerkId: "sample123",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      profilePhoto: "profile.jpg",
    });

    await sampleUser.save();

    console.log("Sample data added to the database");

    return new Response({ data: "Sample data added to the database" }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return new Response({ error: "Internal Server Error" }, { status: 500 });
  }
}

