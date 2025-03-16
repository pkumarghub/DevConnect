"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
// CORS Configuration
const corsOptions = {
    origin: ["http://localhost:3000", "https://your-frontend.com"], // Allowed domains
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies and authentication headers
};
app.use((0, cors_1.default)(corsOptions));
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});
app.use(limiter);
// Logging
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "error.log", level: "error" }),
    ],
});
app.use(express_winston_1.default.logger({
    winstonInstance: logger,
    statusLevels: true,
}));
// Routes
app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});
app.get("/heavy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Simulating heavy processing
    const heavyCalculation = Array(1e7)
        .fill(0)
        .map(() => Math.random());
    res.json({ result: heavyCalculation.length });
}));
// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
exports.default = app;
