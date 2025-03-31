import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from 'express-validator';


export const validateUser: RequestHandler[] = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isString().notEmpty().isLength({ min: 6 }).withMessage('Password must be atleat 6 charaters long'),
    body('email').isEmail().notEmpty().withMessage('Email is required'), // Add email validation
    body('role').isString().notEmpty().withMessage('Role is required'), // Add role validation
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
]

export const validateUserForFollowerApi: RequestHandler[] = [
    body('loggedInUser').isString().notEmpty().withMessage('LoggedIn username can not be empty'),
    body('userToBeFollowed').isString().notEmpty().withMessage('User to be followed can not be empty'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
]

export const validateUserForUnFollowerApi: RequestHandler[] = [
    body('loggedInUser').isString().notEmpty().withMessage('LoggedIn username can not be empty'),
    body('userToBeUnFollowed').isString().notEmpty().withMessage('User to be unfollowed can not be empty'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
]