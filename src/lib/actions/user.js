import User from '@/lib/models/user'
import { connectToDatabase } from '@/lib/dbConfig/dbConfig';


// documentation 
// url - https://dashboard.clerk.com/apps/app_2bovxrcWEvWfGPi8ZYPri7IlbE4/instances/ins_2bovy537HArzYpnMXgSH2BiX1yO/webhooks
// of user.created of clerk in mongodb (go in webhook option, then event catlog)
// sample data is
// {
//     "data": {
//       "birthday": "",
//       "created_at": 1654012591514,
//       "email_addresses": [
//         {
//           "email_address": "example@example.org",
//           "id": "idn_29w83yL7CwVlJXylYLxcslromF1",
//           "linked_to": [],
//           "object": "email_address",
//           "verification": {
//             "status": "verified",
//             "strategy": "ticket"
//           }
//         }
//       ],
//       "external_accounts": [],
//       "external_id": "567772",
//       "first_name": "Example",
//       "gender": "",
//       "id": "user_29w83sxmDNGwOuEthce5gg56FcC",
//       "image_url": "https://img.clerk.com/xxxxxx",
//       "last_name": "Example",
//       "last_sign_in_at": 1654012591514,
//       "object": "user",
//       "password_enabled": true,
//       "phone_numbers": [],
//       "primary_email_address_id": "idn_29w83yL7CwVlJXylYLxcslromF1",
//       "primary_phone_number_id": null,
//       "primary_web3_wallet_id": null,
//       "private_metadata": {},
//       "profile_image_url": "https://www.gravatar.com/avatar?d=mp",
//       "public_metadata": {},
//       "two_factor_enabled": false,
//       "unsafe_metadata": {},
//       "updated_at": 1654012591835,
//       "username": null,
//       "web3_wallets": []
//     },
//     "object": "event",
//     "type": "user.created"
//   }

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
      await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
      console.error(error);
    }
  };