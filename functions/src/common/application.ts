import { functionConfig } from './utils';
import { logger } from "firebase-functions";

export class ApplicationHandler {
    private appConfig: any;
    constructor() {
        const cnf = functionConfig();
        if (cnf) {
            this.appConfig = cnf;
        } else {
            throw new Error("Application Error Configuration Missing");
        }
        process.on('uncaughtException', (err) => {
            logger.error("UncaughtException processing: %s", err);
        });
        logger.info("system booting");
    }

    public get Config(): any {
        return this.appConfig;
    }
}
