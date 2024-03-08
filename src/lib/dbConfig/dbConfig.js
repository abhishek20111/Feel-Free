
import mongoose from "mongoose";



let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("DB connected already");
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://project:LrmePKBVp0ilFNoY@cluster0.cw3zhzn.mongodb.net/?retryWrites=true&w=majority', {
      dbName: "freeFall",
    });
    isConnected = true;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};