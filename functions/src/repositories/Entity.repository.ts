import { EntitiesModel } from "../models/entities.model";
import { EntityHoursModel } from "../models/entityHours.model";
import collection from "../common/collections";
import * as firebase from 'firebase-admin';
class EntityRepository {
    public async create<T>(entity: EntitiesModel): Promise<T | undefined>  {
        const docRef = await firebase.firestore().collection(collection.collectionEntities).add(entity);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as T;
        }
        return undefined;
    }
    public async createEntityHour(entities: EntityHoursModel[]) : Promise<void>{
        const batch = await firebase.firestore().batch();

        const docRef = await firebase.firestore().collection(collection.collectionEntityHours);
        entities.forEach(entity => {
            batch.set(docRef.doc(), entity);
        });
        await batch.commit();
    }

    public async locateEntity<T>(entity_id: string): Promise<T | undefined> {
        const docRef = await firebase.firestore().collection(collection.collectionEntities).doc(entity_id);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            return await doc.data() as T;
        }
        return undefined;
    }

    public async updateEntity(entity_id: string, entity: EntitiesModel): Promise<boolean> {
        const docRef = await firebase.firestore().collection(collection.collectionEntities).doc(entity_id);
        await docRef.set({
            name: entity.name,
            alias_name: entity.alias_name,
            description: entity.description,
            phone: entity.phone,
            city: entity.city,
            country: entity.country,
            update_at: new Date(),
        });
        return true;
    }
    public async updateEntityHours(entity_id: string, entities: EntityHoursModel[]): Promise<void> {
        const batch = await firebase.firestore().batch();
        const docExistRef = await firebase.firestore().collection(collection.collectionEntityHours).doc(entity_id);
        batch.delete(docExistRef);
        const docHourRef = await firebase.firestore().collection(collection.collectionEntityHours);
        entities.forEach(async entity => {
            batch.set(docHourRef.doc(), entity);
        });
        await batch.commit();
    }
    public async deleteEntity(entity_id: string): Promise<void> {
        await firebase.firestore().collection(collection.collectionEntityHours).doc(entity_id).delete();
        await firebase.firestore().collection(collection.collectionEntities).doc(entity_id).delete();
    }
}

export default new EntityRepository();
