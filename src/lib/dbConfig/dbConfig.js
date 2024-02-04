const mongoose = require('mongoose');

// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = 'mongodb+srv://project:LrmePKBVp0ilFNoY@cluster0.cw3zhzn.mongodb.net/?retryWrites=true&w=majority';

let cached = global.mongoose || { conn: null, promise: null };

const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  });

  cached.conn = await cached.promise;

  return cached.conn;
};

module.exports = { connectToDatabase };
