import { createOrUpdate } from '@/lib/actions/user';
import { connectToDatabase } from '@/lib/dbConfig/dbConfig';
import User from '@/lib/models/user';

export async function GET(req) {
  try {
    // Sample values for user data
    const id = "sampleId414231";
    const first_name = "John";
    const last_name = "Doe";
    const image_url = "https://example.com/image.jpg";
    const email_addresses = [
      {
        "email_address": "example@example.org",
        "id": "idn_29w83yL7CwVlJXylYLxcslromF1",
        "linked_to": [],
        "object": "email_address",
        "verification": {
          "status": "verified",
          "strategy": "ticket"
        }
      }
    ];
    const username = "john_doe";


    // Call createOrUpdate function with sample data
    const data =  await createOrUpdate(id, first_name, last_name, image_url, email_addresses, username);
    console.log(data);
    console.log("Sample data added to the database");

    // Assuming Response is from the Fetch API
    return new Response({ data: "Sample data added to the database" }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    
    // Assuming Response is from the Fetch API
    return new Response({ error: "Internal Server Error" }, { status: 500 });
  }
}
