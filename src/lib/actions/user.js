import User from '@/lib/models/user'
import { connectToDatabase } from '@/lib/dbConfig/dbConfig';


export const createOrUpdate = async (
    id,
    first_name,
    last_name,
    image_url,
    email_addresses,
    username
) => {
    try {
        await connectToDatabase();
        console.log("Login here ");
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    profilePhoto: image_url,
                    email: email_addresses[0].email_address,
                    username: username,
                },
            },
            { upsert: true, new: true } // if user doesn't exist, create a new one
        );
        console.log(user);
        await user.save();
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (id) => {
    try {
      await connectToDatabase();
      console.log("Deleting data");
      console.log("Login here ");
      await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
      console.error(error);
    }
  };