import firebase from "firebase";
import { collections, UsersModel } from "../models";

class UsersRepository {
    public async registerUser(entity: UsersModel): Promise<UsersModel> {
        const docRef = await firebase.firestore().collection(collections.collectionsUsers).add(entity);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as UsersModel;
        }
        return null;
    }

    public async getUserByEmail(email: string): Promise<UsersModel> {
        const query = await firebase.firestore().collection(collections.collectionsUsers).where('email', '==', email.toLowerCase().trim()).get();
        if (!query.empty) {
            const doc = query[0];
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as UsersModel;
        }
        return null;
    }

    public async getUserByPhone(phone: string): Promise<UsersModel> {
        const query = await firebase.firestore().collection(collections.collectionsUsers).where('phone', '==', phone.toLowerCase().trim()).get();
        if (!query.empty) {
            const doc = query[0];
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as UsersModel;
        }
        return null;
    }

    public async getUserByUID(uid: string): Promise<UsersModel> {
        const query = await firebase.firestore().collection(collections.collectionsUsers).where('uid', '==', uid.trim()).get();
        if (!query.empty) {
            const doc = query[0];
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as UsersModel;
        }
        return null;
    }
}

export default new UsersRepository()