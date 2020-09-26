import { collection, EntitiesModel, EntityHoursModel, entityModel } from "../models";
import * as firebase from "firebase-admin";
import { BaseListDataModel } from "../common/base.model";
import { SORT_DIRECTION, toDate } from "simple-cached-firestore";
import { entityModel } from '../models/index';
import moment from "moment";
class EntityRepository {
    public async create(entity: EntitiesModel): Promise<EntitiesModel | null> {
        const doc = await entityModel.create(entity);
        if (doc) {
            return doc;
        }
        return null;
    }
    public async get(id: string): Promise<EntitiesModel | null> {
        const doc = await entityModel.get(id);
        return !!doc ? doc : null;
    }

    public async list(per_page: number, offset_id: string, sort_field: string, sort_direction: SORT_DIRECTION): Promise<BaseListDataModel<EntitiesModel>> {
        const paginatedQuery = {
            sort: {
                property: sort_field,
                direction: sort_direction,
            },
            limit: per_page, // Return 100 values max
            // Before or After should match sort property
            after: offset_id, // Show page of up to 100, with entries that occur after the createdAt 'created-at-1'
        };
        const docs = await entityModel.query(paginatedQuery);
        // TODO this what need be implemented
        // https://stackoverflow.com/questions/50922417/how-to-paginate-or-infinite-scroll-by-number-of-items-in-firestore
        // https://firebase.google.com/docs/firestore/query-data/query-cursors
        return { size: docs.length, items: docs };
    }
    public async createEntityHour(entity_id: string, entities: EntityHoursModel[]): Promise<void> {
        const doc = await this.get(entity_id);
        if (doc) {
            doc.hours = [...entities];
            await entityModel.update(entity_id, doc, toDate(moment()));
        }
    }

    public async locateEntity(entity_id: string): Promise<EntitiesModel | null> {
        const docRef = await entityModel.exists(entity_id);
        if (docRef) {
            return await entityModel.get(entity_id);
        }
        return null;
    }

    public async updateEntity(entity_id: string, entity: EntitiesModel): Promise<boolean> {
        const docRef = await entityModel.update(entity_id, entity);
        return !!docRef;
    }
    public async updateEntityHours(entity_id: string, entities: EntityHoursModel[]): Promise<void> {
        const doc = await this.get(entity_id);
        if (doc) {
            doc.hours = [...entities];
            await entityModel.update(entity_id, doc, toDate(moment()));
        }
    }
    public async deleteEntity(entity_id: string): Promise<void> {
        const docRef = await entityModel.exists(entity_id);
        if (docRef) {
            await entityModel.remove(entity_id);
        }
    }
    public async cleanOpeningHours(entity_id: string): Promise<void> {
        const batch = await firebase.firestore().batch();
        const docExistRef = await firebase.firestore().collection(collection.collectionEntityHours).where("entity_id", "==", entity_id).get();
        if (!docExistRef.empty) {
            docExistRef.docs.forEach(docRef => batch.delete(docRef.ref));
        }
        await batch.commit();
    }
    public async bulkDelete(entity_ids: string[]): Promise<void> {
        const batch = await firebase.firestore().batch();

        for await (const entity_id of entity_ids) {
            const docRef = await firebase.firestore().collection(collection.collectionEntities).doc(entity_id);
            const docExistRef = await firebase.firestore().collection(collection.collectionEntityHours).where("entity_id", "==", entity_id).get();
            if (!docExistRef.empty) {
                docExistRef.docs.forEach(tDocRef => batch.delete(tDocRef.ref));
            }
            batch.delete(docRef);
        }
        await batch.commit();
    }
}

export default new EntityRepository();
