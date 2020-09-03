import * as admin from 'firebase-admin';
import * as moment from 'moment';
import { TestObject } from '../models/TestObject';
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
        const docRef = await admin.firestore().collection(collection.collectionEntityHours).doc();
        entities.forEach(entity => {
            batch.create(docRef, entity);
        });
        await batch.commit();
    }
}

export default new EntityRepository();