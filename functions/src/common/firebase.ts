
import * as firebase from "firebase-admin";
export class FirebaseHandler {
    public static db: firebase.firestore.Firestore;

    public static setupFirebase(firebase: any) {
        firebase.initializeApp({ credential: firebase.credential.applicationDefault() });
        FirebaseHandler.db = firebase.firestore();
        FirebaseHandler.db.settings({ timestampsInSnapshots: true });
    }
    public static setupFirebaseTest(mockFirebase: any) {
        const app = mockFirebase.initializeApp();
        FirebaseHandler.db = app.firestore();
        //FirebaseHandler.db.settings({ timestampsInSnapshots: true });
    }
}
