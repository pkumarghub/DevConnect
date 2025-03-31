import mongoose, { Schema, Model } from 'mongoose';
import { IUser, UserRole } from "../interface/User";

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

// Define Schema
const userSchema: Schema<IUser> = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, required: true, default: UserRole.Admin, enum: Object.values(UserRole) },
    fullName: { type: String, set: capitalizeFirstLetter },
    bio: { type: String },
    experience: [
        {
            title: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String },
        },
    ],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    postsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    likesReceived: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    { strict: true } // This ensures only defined fields are allowed
);

// Create and Export Model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;