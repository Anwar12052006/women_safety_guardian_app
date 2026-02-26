import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,
        });

        console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan?.bold || 
      `MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // exit app if DB fails
  }
};

export default connectDB;
  