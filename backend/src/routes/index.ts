import express from 'express';
import authRoutes from './User.route';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
