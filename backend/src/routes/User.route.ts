import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *              - password
 *              - email
 *              - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "email@gmail.com"
 *               role:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username and password are required
 *       500:
 *         description: Registration failed
 */
router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;
