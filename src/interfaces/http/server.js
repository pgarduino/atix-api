import express from "express";

export class Server {
    constructor({ config, router, logger }) {
        this.config = config;
        this.logger = logger;
        this.express = express();
        this.express.use(router);
        this.http = null;
    }

    start() {
        return new Promise((resolve) => {
            this.http = this.express.listen(this.config.web.port, () => {
                const { port } = this.http.address();
                this.logger.info(`Listening at port ${port}`);
                this.logger.info(`Running on pId [${process.pid}]`);
                resolve();
            });
        });
    }

    stop() {
        return new Promise(resolve => {
            this.http.close(() => {
                this.http = null;
                this.logger.info(`Shutting down server...`);
                resolve();
            })
        })
    }
}