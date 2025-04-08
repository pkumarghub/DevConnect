import express from "express";
import { PostController } from "../controllers/PostController";

const router = express.Router();

router.post('/get-details', PostController.getPostDetails);
router.post('/create', PostController.create);

export default router;