import dotenv from 'dotenv';

dotenv.config();

export const config = {
    secretKey: process.env.SECRET_KEY || 'default-secret-key',
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI || "mongodb://localhost:27017/devConnect"
};