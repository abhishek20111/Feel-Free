import mongoose from "mongoose";

let isConnected = false; // Track connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://project:LrmePKBVp0ilFNoY@cluster0.cw3zhzn.mongodb.net/?retryWrites=true&w=majority', {
      dbName: "FeelFree",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
