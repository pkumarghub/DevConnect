import { IPost } from "../interface/Post";
import Post from "../models/Post";

export class PostService {
    static async getPostDetails(_id: string): Promise<IPost | null> {
        const postData = await Post.findById({ _id });

        if (!postData) return null;
        return postData;
    }

    static async create(body: IPost): Promise<IPost> {
        const post = new Post(body);
        await post.save();
        return post;
    }

}