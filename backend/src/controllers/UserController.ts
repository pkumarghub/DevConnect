import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }

            const user = await UserService.register(username, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed', details: (error as Error).message });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }

            const user = await UserService.login(username, password);
            if (!user) {
                res.status(401).json({ error: 'Authentication failed' });
                return;
            }

            const token = jwt.sign({ userId: user._id }, config.secretKey, {
                expiresIn: '1h',
            });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Login failed', details: (error as Error).message });
        }
    }
}