import cluster from "cluster";
import os from "os";
import { closeMongoConnection } from "./config/dbConnect";
import app from "./app";
import { config } from "./config/config";
import swaggerDocs from "./utils/swagger";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {

    process.on("SIGINT", closeMongoConnection); // Handle Ctrl+C
    process.on("SIGTERM", closeMongoConnection); // Handle process termination
    process.on("exit", closeMongoConnection); // Handle process exit

    app.listen(config.port, () => {
        console.log(`Worker ${process.pid} started on port ${config.port}`);

        swaggerDocs(app, Number(config.port));
    });
}