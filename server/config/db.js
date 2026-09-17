import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/caresphere';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout if Mongo isn't running locally
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`! MongoDB not reachable at ${uri}. Backend will serve datasets directly from JSON storage.`);
    return false;
  }
};
