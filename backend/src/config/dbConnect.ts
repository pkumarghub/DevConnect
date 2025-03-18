import mongoose from "mongoose";
import { config } from "./config";

const MONGO_URI = config.mongo_uri;

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
