import express from 'express';
import { UserController } from '../controllers/UserController';
import { validateUser, validateUserForFollowerApi, validateUserForUnFollowerApi } from '../middleware/validation';

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
router.post('/user/register', validateUser, UserController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
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
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /auth/user/get-details:
 *   post:
 *     summary: Get user details
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to retrieve user details
 */
router.post('/user/get-details', UserController.getUserDetails);

/**
 * @swagger
 * /auth/user/update:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Update failed
 */
router.put('/user/update', UserController.updateUser);

/**
 * @swagger
 * /auth/user/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Deletion failed
 */
router.delete('/user/delete', UserController.deleteUser);

/**
 * @swagger
 * /auth/user/add-as-follower:
 *   post:
 *     summary: Add a user as a follower
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - loggedInUser
 *              - userToBeFollowed
 *             properties:
 *               loggedInUser:
 *                 type: string
 *                 example: "john_doe"
 *               userToBeFollowed:
 *                 type: string
 *                 example: "jane_doe"
 *     responses:
 *       200:
 *         description: Follower added successfully
 *       404:
 *         description: User or follower not found
 *       500:
 *         description: Failed to add follower
 */
router.post('/user/add-as-follower', validateUserForFollowerApi, UserController.addAsFollower);

/**
 * @swagger
 * /auth/user/remove-as-follower:
 *   post:
 *     summary: Remove a user as a follower
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - loggedInUser
 *              - userToBeUnFollowed
 *             properties:
 *               loggedInUser:
 *                 type: string
 *                 example: "john_doe"
 *               userToBeUnFollowed:
 *                 type: string
 *                 example: "jane_doe"
 *     responses:
 *       200:
 *         description: Follower removed successfully
 *       404:
 *         description: User or follower not found
 *       500:
 *         description: Failed to remove follower
 */
router.post('/user/remove-as-follower', validateUserForUnFollowerApi, UserController.removeAsFollower);

export default router;
