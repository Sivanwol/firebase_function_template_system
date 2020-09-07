import { EntitiesModel } from '../models/entities.model';
import { EntityHoursModel } from '../models/entityHours.model';
import collection from '../common/collections';
import { FirebaseHandler } from '../common/firebase';
import * as firebase from 'firebase-admin';
class EntityRepository {
    public async create<T>(entity: EntitiesModel): Promise<T | undefined>  {
        const docRef = await FirebaseHandler.db.collection(collection.collectionEntities).add(entity);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            return await doc.data() as T;
        }
        return undefined;
    }
    public async createEntityHour(entities: EntityHoursModel[]): Promise<void> {
        const batch = FirebaseHandler.db.batch();

        const docRef = await FirebaseHandler.db.collection(collection.collectionEntityHours);
        entities.forEach(async entity => {
            batch.set(docRef.doc(), entity);
        });
        await batch.commit();
    }

    public async locateEntity<T>(entity_id: string): Promise<T | undefined> {
        const docRef = await FirebaseHandler.db.collection(collection.collectionEntities).doc(entity_id);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            return await doc.data() as T;
        }
        return undefined;
    }

    public async updateEntity(entity_id: string, entity: EntitiesModel) : Promise<boolean> {
        const docRef = await FirebaseHandler.db.collection(collection.collectionEntities).doc(entity_id);
        await docRef.set({
            name: entity.name,
            alias_name: entity.alias_name,
            description: entity.description,
            phone: entity.phone,
            city: entity.city,
            country: entity.country,
            update_at: new Date()
        });
        return true;
    }
    public async updateEntityHours(entity_id: string, entities: EntityHoursModel[]): Promise<void> {
        await FirebaseHandler.db.collection(collection.collectionEntityHours).doc(entity_id).delete();
        const batch = FirebaseHandler.db.batch();
        const docHourRef = await FirebaseHandler.db.collection(collection.collectionEntityHours);
        entities.forEach(async entity => {
            batch.set(docHourRef.doc(), entity);
        });
        await batch.commit();
    }
    public async deleteEntity(entity_id: string): Promise<void> {
        await FirebaseHandler.db.collection(collection.collectionEntityHours).doc(entity_id).delete();
        await FirebaseHandler.db.collection(collection.collectionEntities).doc(entity_id).delete();
    }
}

export default new EntityRepository();