import mongoose from "mongoose";
//dotenv.config({ path: "./env" });

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `MongoDB Connected! DB_HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connction failed:", error);
    process.exit(1);
  }
};

export default connectDB;
