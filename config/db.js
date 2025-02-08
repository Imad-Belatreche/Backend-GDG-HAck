import mongoose from "mongoose"

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to db ...');
  } catch (error) {
    console.error(error);
  }
}