import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.register(req.body);
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
    
    static async deleteUser(req: Request, res: Response): Promise<void> {
        try{
            const username = req.body?.username || "";
            if((username === "")){
                res.status(400).json({error: "Username is required."});
            }

            const user  = await UserService.deleteUser(username);
            if(user) {
                res.status(200).json({message: "User deleted successfully."})
            } else {
                res.status(400).json({message: "User not found in database."})
            }


        } catch(error) {
            res.status(500).json({ error: 'User Deletion failed', details: (error as Error).message });
        }
    }
}