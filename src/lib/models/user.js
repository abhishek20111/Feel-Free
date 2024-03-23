import mongoose from "mongoose";
import Post from "./post.js";

const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    uinque: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  savedPosts: [{
    type: ObjectId,
     ref: "Post",
    default: [],
  }],
  followers: [{
    type:  ObjectId,
     ref: "User" ,
    default: [],
  }],
  following: [{
    type: ObjectId, 
    ref: "User",
    default: [],
  }]
},{timestamps: true});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;