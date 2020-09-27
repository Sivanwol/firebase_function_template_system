
import * as firebaseEmulator from '@firebase/testing';
import * as firebase from "firebase-admin";
import * as serviceAccount  from "../serviceAccountKey.json";
// import { logger } from 'firebase-functions';
const projectId = 'ictravel-dev-planning';
export class FirebaseHandler {
    public static db: firebase.firestore.Firestore | firebaseEmulator.firestore.Firestore;

    public static setupFirebase(firebase: any) {
        const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
        adminConfig.credential = firebase.credential.cert(serviceAccount);
        console.log(adminConfig);
        firebase.initializeApp(adminConfig);
        // firebase.initializeApp({ credential: firebase.credential.applicationDefault() });
        firebase.firestore().settings({ timestampsInSnapshots: true });
    }
    public static setupFirebaseTest(mockFirebase: any) {
        // initialize test database
        process.env.GCLOUD_PROJECT = projectId;
        process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
        firebaseEmulator.initializeAdminApp({
            projectId
        });
        firebase.initializeApp({ credential: firebase.credential.applicationDefault() });
        firebase.firestore().settings({ timestampsInSnapshots: true });
        // const app = mockFirebase.initializeApp();
        // FirebaseHandler.db = app.firestore();
        //FirebaseHandler.db.settings({ timestampsInSnapshots: true });
    }
}
