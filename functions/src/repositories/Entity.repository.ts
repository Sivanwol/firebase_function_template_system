import { EntitiesModel } from "../models/entities.model";
import { EntityHoursModel } from "../models/entityHours.model";
import collection from "../common/collections";
import * as firebase from "firebase-admin";
import { SortDirection } from "../common/enums";
import { BaseListDataModel } from "../common/base.model";
class EntityRepository {
    public async create(entity: EntitiesModel): Promise<EntitiesModel | null>  {
        const docRef = await firebase.firestore().collection(collection.collectionEntities).add(entity);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as EntitiesModel;
        }
        return null;
    }
    public async get(id: string): Promise<EntitiesModel| null>{
        const doc = await firebase.firestore().collection(collection.collectionEntities).doc(id).get();
        if (doc && doc.exists) {
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as EntitiesModel;
        }
        return null;
    }

    public async getEntityHours(id: string): Promise<BaseListDataModel<EntityHoursModel>> {
        const docs = await firebase.firestore().collection(collection.collectionEntityHours).where("entity_id", "==", id).get();
        let items = [];
        if (docs && !docs.empty) {
            items = docs.docs.map(async doc => {
                const temp = await doc.data() as EntityHoursModel;
                temp.id = doc.id;
                return temp;
            });
        }
        return {size:docs.size, items};
    }
    public async list(per_page: number , offset_id: string , sort_field: string, sort_direction: SortDirection): Promise<BaseListDataModel<EntitiesModel>> {
        const sort = (sort_direction === SortDirection.ASC)? "asc" : "desc" ;
        const docs = await firebase.firestore().collection(collection.collectionEntities)
                .startAfter({id: offset_id})
                .limit(per_page)
                .orderBy(sort_field, sort)
                .get();
        // TODO this what need be implemented
        // https://stackoverflow.com/questions/50922417/how-to-paginate-or-infinite-scroll-by-number-of-items-in-firestore
        // https://firebase.google.com/docs/firestore/query-data/query-cursors
        let items = [];
        if (docs && !docs.empty) {
            items = docs.docs.map(async doc => {
                const temp = await doc.data() as EntitiesModel;
                temp.id = doc.id;
                return temp;
            });
        }
        return { size: docs.size , items};
    }
    public async createEntityHour(entities: EntityHoursModel[]): Promise<void> {
        const batch = await firebase.firestore().batch();

        const docRef = await firebase.firestore().collection(collection.collectionEntityHours);
        entities.forEach(entity => {
            batch.set(docRef.doc(), entity);
        });
        await batch.commit();
    }

    public async locateEntity(entity_id: string): Promise<EntityHoursModel | undefined> {
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
