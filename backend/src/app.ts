import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";
import { connectDb } from "./config/dbConnect";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());


// CORS Configuration
const corsOptions = {
    origin: ["http://localhost:3000", "https://your-frontend.com"], // Allowed domains
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));



// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});
app.use(limiter);

connectDb()

// Logging
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
});

app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server is running!" });
});

app.get("/heavy", async (req: Request, res: Response) => {
    // Simulating heavy processing
    const heavyCalculation = Array(1e7)
        .fill(0)
        .map(() => Math.random());
    res.json({ result: heavyCalculation.length });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});




export default app;