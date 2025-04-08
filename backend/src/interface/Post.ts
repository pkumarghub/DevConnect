import mongoose from "mongoose";

export interface IPost extends Document {
    title: string;
    content: string;
    tags: string[];
    userId: mongoose.Types.ObjectId;
    likesReceived: { type: Number, default: 0 };
    createdAt: Date;
    updatedAt: Date;
}