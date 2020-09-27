
import winston, { Logger } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

import { get } from "lodash";
import { functionConfig } from './utils';

export class ApplicationHandler {
    private appConfig: any;
    private logger: Logger;
    constructor() {
        const cnf = functionConfig();
        if (cnf) {
            this.appConfig = cnf;
        } else {
            throw new Error("Application Error Configuration Missing");
        }
        const loggingWinston = new LoggingWinston({
            serviceContext: {
                service: 'backend-service', // required to report logged errors
            },
        });
        this.logger = winston.createLogger({
            level: get(this.appConfig, 'settings.logs.level'),
            format: winston.format.simple(),
            transports: [
                new winston.transports.Console(),
                // Add Stackdriver Logging
                loggingWinston,
            ],
            exceptionHandlers: [
                loggingWinston,
            ]
        });

        process.on('uncaughtException', (err) => {
            this.logger.error("UncaughtException processing: %s", err);
        });
        this.logger.info("system booting");
    }

    public get Config(): any {
        return this.appConfig;
    }

    public get Logger(): Logger {
        return this.logger;
    }
}
