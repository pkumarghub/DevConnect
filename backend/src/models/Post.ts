import mongoose, { Model, Schema } from "mongoose";
import { IPost } from "../interface/Post";
import User from "./User";

const postSchema: Schema<IPost> = new Schema({
    title: { type: String, unique: true, required: true },
    content: { type: String, unique: true, required: true },
    tags: [{ type: String, required: true }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likesReceived: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Increment count after saving a comment
postSchema.post('save', async function (doc) {
    await User.findByIdAndUpdate(doc.userId, { $inc: { postsCount: 1 } });
});

// Decrement count after deleting a comment
postSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await User.findByIdAndUpdate(doc.userId, { $inc: { postsCount: -1 } });
    }
});

const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);
export default Post;