import cluster from "cluster";
import os from "os";
import { closeMongoConnection } from "./config/dbConnect";
import app from "./app";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        // cluster.fork();
    });
} else {

    process.on("SIGINT", closeMongoConnection); // Handle Ctrl+C
    process.on("SIGTERM", closeMongoConnection); // Handle process termination
    process.on("exit", closeMongoConnection); // Handle process exit

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}