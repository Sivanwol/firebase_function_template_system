import "reflect-metadata"; // this shim is required
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { logger } from "firebase-functions";
// import * as bodyParser from 'body-parser'
// import * as cors from 'cors'
import { Application, Request, Response } from "express";
import { Action, createExpressServer } from "routing-controllers";
import { apiRoutes } from "./routes";
import { FirebaseHandler } from "./common/firebase";
import { ApplicationHandler } from "./common/application";
import { GenderEnum } from "./common/enums";
import { UsersModel } from "./models";
import UsersService from "./services/users.service";
import * as passport from 'passport';
import moment from "moment";
import { Auth0strategy } from "./middlewares/Auth.middelware";

class Api {
    public app: Application;
    public appHandler: ApplicationHandler;
    public firebase = null;

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
            authorizationChecker: async (action: Action, roles = []) =>  {
                const req = action.request;
                if (req.headers[this.appHandler.Config.ServiceTokenHeaderName] &&
                    req.headers[this.appHandler.Config.ServiceTokenHeaderName] === this.appHandler.Config.ServiceToken) {
                    return true;
                }
                const [err, user, info] = await passport.authenticate("auth0", {
                    scope: roles,
                });
                if (err) {
                    return false;
                }
                action.request.user = user;
                return true;
            },
            currentUserChecker: (action: Action) => action.request.user,
            routePrefix: 'api',
            development: true,
            cors: true,
            controllers: apiRoutes,
        });
        logger.info("Started application");
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
            logger.info(`New Register User, ${user.uid}`);
            await UsersService.registerNewUser(userModel);
        });
    }
    private config(): void {
        this.bindingEvents();

        const session = {
            secret: process.env.SESSION_SECRET,
            cookie: {},
            resave: false,
            saveUninitialized: false,
        };
        this.app.use(expressSession(session));

        passport.use(Auth0strategy);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private firebaseSetup(): void {
        logger.info("Connection Firebase");
        this.firebase = FirebaseHandler.setupFirebase(admin);
    }
}
const app = new Api();
export const firebase = app.firebase;
// webApi is your functions name, and you will pass this.api as a parameter
export const webApi = functions.https.onRequest(app.app);
// for more tasks please add below here
