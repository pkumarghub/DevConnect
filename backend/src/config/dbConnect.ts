import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase"; // Replace with your MongoDB URL

export const connectDb = () => {
    mongoose
        .connect(MONGO_URI)
        .then(() => console.log(`MongoDB connected in worker ${process.pid}`))
        .catch((err) => console.error("MongoDB connection error:", err));
}


// Handle graceful shutdown for MongoDB when worker exits
export const closeMongoConnection = async () => {
    console.log(`Closing MongoDB connection in worker ${process.pid}`);
    await mongoose.connection.close();
    process.exit(0);
};
