"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const dbConnect_js_1 = require("./config/dbConnect.js");
const app_js_1 = __importDefault(require("./app.js"));
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        // cluster.fork();
    });
}
else {
    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection:', reason);
    });
    process.on("SIGINT", dbConnect_js_1.closeMongoConnection); // Handle Ctrl+C
    process.on("SIGTERM", dbConnect_js_1.closeMongoConnection); // Handle process termination
    process.on("exit", dbConnect_js_1.closeMongoConnection); // Handle process exit
    const PORT = process.env.PORT || 3001;
    app_js_1.default.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}
