import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from "../interface/User";

// Define Schema
const userSchema: Schema<IUser> = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Create and Export Model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;