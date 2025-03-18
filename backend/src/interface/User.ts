import { Document } from 'mongoose';

// Define User Interface
export interface IUser extends Document {
    username: string;
    password: string;
}