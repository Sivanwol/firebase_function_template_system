import * as functions from "firebase-functions";
import winston, { Logger } from 'winston';
import LogzioWinstonTransport from 'winston-logzio';
import { get } from "lodash";
const functionConfig = () => {
    if (process.env.RUN_LOCALLY) {
        const fs = require('fs');
        return JSON.parse(fs.readFileSync('env.json'));
    } else {
        return functions.config();
    }
};
export class ApplicationHandler {
    private appConfig: any;
    private logger: Logger;
    constructor() {
        const cnf = functionConfig();
        if (cnf.activeEnv && cnf[cnf.activeEnv]) {
            this.appConfig = cnf[cnf.activeEnv];
        } else {
            throw new Error("Application Error Configuration Missing");
        }

        const loggerOptions = {
            level: get(this.appConfig, 'logger.level'),
            name: 'winston_logzio',
            token: get(this.appConfig, 'logger.token'),
            host: 'listener-eu.logz.io',
        };
        const logzIOTransport = new (LogzioWinstonTransport)(loggerOptions);
        this.logger = winston.createLogger({
            format: winston.format.simple(),
            transports: [
                logzIOTransport
            ],
            exceptionHandlers: [
                logzIOTransport,
            ]
        });

        process.on('uncaughtException', (err) => {
            this.logger.error("UncaughtException processing: %s", err);
        });
        this.logger.info("system booting");
    }
    public getConfig(): any {
        return this.appConfig;
    }

    public getLogger(): Logger {
        return this.logger;
    }
}
