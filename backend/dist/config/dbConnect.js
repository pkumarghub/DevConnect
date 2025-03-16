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
exports.closeMongoConnection = exports.connectDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase"; // Replace with your MongoDB URL
console.log("=====>process.env", process.env.MONGO_URI);
const connectDb = () => {
    mongoose_1.default
        .connect(MONGO_URI)
        .then(() => console.log(`MongoDB connected in worker ${process.pid}`))
        .catch((err) => console.error("MongoDB connection error:", err));
};
exports.connectDb = connectDb;
// Handle graceful shutdown for MongoDB when worker exits
const closeMongoConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Closing MongoDB connection in worker ${process.pid}`);
    yield mongoose_1.default.connection.close();
    process.exit(0);
});
exports.closeMongoConnection = closeMongoConnection;
