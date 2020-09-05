import { EntitiesModel } from '../models/entities.model';
import { EntityHoursModel } from '../models/entityHours.model';
import collection from '../common/collections';
import { FirebaseHandler } from '../common/firebase';
class EntityRepository {
    async create(entity: EntitiesModel) {
        return await FirebaseHandler.db.collection(collection.collectionEntities).add(entity);
    }
    async createEntityHour(entities: EntityHoursModel[]) {
        const batch = FirebaseHandler.db.batch();

        const docRef = await FirebaseHandler.db.collection(collection.collectionEntityHours);
        entities.forEach(async entity => {
            batch.set(docRef.doc(), entity);
        });
        await batch.commit();
    }

    async locateEntity(entity_id: string) {
        const docRef = await FirebaseHandler.db.collection(collection.collectionEntities).doc(entity_id);
        return await docRef.get();
    }

    async updateEntity(entity_id: string, entity: EntitiesModel) {
        const docRef = await FirebaseHandler.db.collection(collection.collectionEntities).doc(entity_id);
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
        await FirebaseHandler.db.collection(collection.collectionEntityHours).doc(entity_id).delete();
        const batch = FirebaseHandler.db.batch();
        const docHourRef = await FirebaseHandler.db.collection(collection.collectionEntityHours);
        entities.forEach(async entity => {
            batch.set(docHourRef.doc(), entity);
        });
        await batch.commit();
    }
    async deleteEntity(entity_id: string) {
        await FirebaseHandler.db.collection(collection.collectionEntityHours).doc(entity_id).delete();
        await FirebaseHandler.db.collection(collection.collectionEntities).doc(entity_id).delete();
    }
}

export default new EntityRepository();