import mongoose, { Document } from 'mongoose';

// Define User Interface
export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    fullName: string;
    bio: string;
    experience: IExperience[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    postsCount: number
    commentsCount: number;
    likesReceived: number;
}

interface IExperience {
    title: string;
    company: string;
    location: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
}[]

export enum UserRole {
    Admin = "admin",
    Moderator = "moderator"
}