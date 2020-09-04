import * as admin from 'firebase-admin';
import * as moment from 'moment';
import { EntitiesModel } from '../models/entities.model';
import { EntityHoursModel } from '../models/entityHours.model';
import collection from '../common/collections';
class EntityRepository {
    async create(entity: EntitiesModel) {
        entity.create_at = moment().toDate();
        entity.update_at = moment().toDate();
        return await admin.firestore().collection(collection.collectionEntities).add(entity);
    }
    async createEntityHour(entities: EntityHoursModel[]) {
        const batch = admin.firestore().batch();

        const docRef = await admin.firestore().collection(collection.collectionEntityHours);
        entities.forEach(async entity => {
            batch.set(docRef.doc(), entity);
        });
        await batch.commit();
    }

    async locateEntity(entity_id: string) {
        const docRef = await admin.firestore().collection(collection.collectionEntities).doc(entity_id);
        return await docRef.get();
    }

    async updateEntity(entity_id: string, entity: EntitiesModel) {
        const docRef = await admin.firestore().collection(collection.collectionEntities).doc(entity_id);
        await docRef.set({
            name: entity.name,
            alias_name: entity.alias_name,
            description: entity.description,
            phone: entity.phone,
            city: entity.city,
            country: entity.country,
        });
        return true;
    }
    async updateEntityHours(entity_id: string, entities: EntityHoursModel[]) {
        await admin.firestore().collection(collection.collectionEntityHours).doc(entity_id).delete();
        const batch = admin.firestore().batch();
        const docHourRef = await admin.firestore().collection(collection.collectionEntityHours);
        entities.forEach(async entity => {
            batch.set(docHourRef.doc(), entity);
        });
        await batch.commit();
    }
}

export default new EntityRepository();