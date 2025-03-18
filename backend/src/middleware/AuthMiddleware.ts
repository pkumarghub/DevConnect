import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface AuthRequest extends Request {
    userId?: string; // Add userId to the Request object
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.secretKey);
        if (typeof decoded !== 'string' && 'userId' in decoded) {
            req.userId = decoded.userId;
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;
