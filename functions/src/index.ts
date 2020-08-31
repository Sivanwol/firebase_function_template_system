import "reflect-metadata"; // this shim is required
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// import * as bodyParser from 'body-parser'
// import * as cors from 'cors'
import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import { apiRoutes } from "./routes";
class Api {
  public app: Application

  constructor() {
    this.firebaseSetup()
    this.app = createExpressServer({
      defaults: {
        //with this option, null will return 404 by default
        nullResultCode: 404,
        //with this option, void or Promise<void> will return 204 by default
        undefinedResultCode: 204,
        paramOptions: {
          //with this option, argument will be required by default
          required: true
        }
      },
      cors: true,
      controllers: apiRoutes
    })
    this.config()
  }

  private config(): void {
    // this.app.use(cors())
    // this.app.use('/api/v1', this.app)
    // this.app.use(bodyParser.json())
    // this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private firebaseSetup(): void {
    admin.initializeApp({ credential: admin.credential.applicationDefault() })
    admin.firestore().settings({ timestampsInSnapshots: true })
  }
}
// webApi is your functions name, and you will pass this.api as a parameter
export const webApi = functions.https.onRequest(new Api().app)