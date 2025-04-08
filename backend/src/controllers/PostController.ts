import { Request, Response } from "express";
import { PostService } from "../services/PostService";

export class PostController {
    static async getPostDetails(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.body;
            if (!id) {
                res.status(400).json({ message: "Post id missing." })
            }
            const postData = await PostService.getPostDetails(id);

            res.status(200).json({ details: postData, message: "Data fetched successfully." })

        } catch (error) {
            res.status(500).json({ error: 'Error occured in fetching data.', details: (error as Error).message })
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const post = await PostService.create(req.body);
            if (!post) {
                res.status(400).json({ message: 'Error in creating post.' })
            }

            res.status(200).json({ data: post, message: "Post created successfully." })
        } catch (error) {
            res.status(500).json({ error: 'Post creation failed.', details: (error as Error).message })
        }
    }

}