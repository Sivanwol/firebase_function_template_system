
import * as firebase from "firebase-admin";
import * as serviceAccount  from "../serviceAccountKey.json";
import firebaseEmulator from '@firebase/testing';
// import { logger } from 'firebase-functions';
const projectId = 'ictravel-dev-planning';
export class FirebaseHandler {

    // tslint:disable-next-line: no-shadowed-variable
    public static setupFirebase(firebase: any): void {
        const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
        adminConfig.credential = firebase.credential.cert(serviceAccount);
        console.log(adminConfig);
        firebase.initializeApp(adminConfig);
        // firebase.initializeApp({ credential: firebase.credential.applicationDefault() });
        firebase.firestore().settings({ timestampsInSnapshots: true });
        return adminConfig;
    }
    public static setupFirebaseTest(mockFirebase: any): void {
        // initialize test database
        process.env.GCLOUD_PROJECT = projectId;
        process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
        firebaseEmulator.initializeAdminApp({
            projectId,
        });
        firebase.initializeApp({ credential: firebase.credential.applicationDefault() });
        firebase.firestore().settings({ timestampsInSnapshots: true });
        // const app = mockFirebase.initializeApp();
        // FirebaseHandler.db = app.firestore();
        // FirebaseHandler.db.settings({ timestampsInSnapshots: true });
    }
}
