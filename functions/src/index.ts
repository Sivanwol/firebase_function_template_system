import "reflect-metadata"; // this shim is required
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
// import * as bodyParser from 'body-parser'
// import * as cors from 'cors'
import { Application, Request, Response } from "express";
import { createExpressServer } from "routing-controllers";
import { apiRoutes } from "./routes";
import { FirebaseHandler } from "./common/firebase";
import { ApplicationHandler } from "./common/application";
import { GenderEnum } from "./common/enums";
import { UsersModel } from "./models";
import UsersService from "./services/users.service";
import moment from "moment";

class Api {
    public app: Application;
    public appHandler: ApplicationHandler;

    constructor() {
        this.appHandler = new ApplicationHandler();
        this.firebaseSetup();
        this.app = createExpressServer({
            defaults: {
                // with this option, null will return 404 by default
                nullResultCode: 404,
                // with this option, void or Promise<void> will return 204 by default
                undefinedResultCode: 204,
                paramOptions: {
                    // with this option, argument will be required by default
                    required: true,
                },
            },
            cors: true,
            controllers: apiRoutes,
        });
        this.appHandler.Logger.info("Started application");
        this.app.use((req: Request, res: Response, next: Function) => {
            res.locals = {
                ...res.locals,
                appHandler: this.appHandler,
            };
        });
        this.config();
    }

    private bindingEvents() {
        functions.auth.user().onCreate(async (user) => {
            const userModel: UsersModel = new UsersModel({
                id: null,
                uuid: user.uid,
                email: user.email,
                displayName: user.displayName,
                location: null,
                phone: user.phoneNumber || '',
                allow_location: false,
                first_time_login: true,
                favoriteLocations: [],
                gender: GenderEnum.Unknown,
                permissions: [],
                roles: [],
                subtitle: '',
                createdAt: moment(user.metadata.creationTime).toDate(),
                updatedAt: moment().toDate(),
            }, false);
            this.appHandler.Logger.info(`New Register User, ${user.uid}`);
            await UsersService.registerNewUser(userModel);
        });
    }
    private config(): void {
        this.bindingEvents();
    }

    private firebaseSetup(): void {
        this.appHandler.Logger.info("Connection Firebase");
        FirebaseHandler.setupFirebase(admin);
    }
}
// webApi is your functions name, and you will pass this.api as a parameter
export const webApi = functions.https.onRequest(new Api().app);
// for more tasks please add below here
