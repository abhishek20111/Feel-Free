
import mongoose from "mongoose";
let isConnected = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect('mongodb+srv://project:LrmePKBVp0ilFNoY@cluster0.cw3zhzn.mongodb.net/?retryWrites=true&w=majority', {
      dbName: "freeFall",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};