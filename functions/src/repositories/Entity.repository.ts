import { collections, EntitiesModel, EntityHoursModel } from "../models";
import * as firebase from "firebase-admin";
import { BaseListDataModel } from "../common/base.model";
import { SortDirection } from "../common/enums";
import moment from "moment";
class EntityRepository {
    public async create(entity: EntitiesModel): Promise<EntitiesModel | null>  {
        entity.createdAt = moment().toDate();
        const docRef = await firebase.firestore().collection(collections.collectionEntities).add(entity);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as EntitiesModel;
        }
        return null;
    }
    public async get(id: string): Promise<EntitiesModel| null> {
        const doc = await firebase.firestore().collection(collections.collectionEntities).doc(id).get();
        if (doc && doc.exists) {
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as EntitiesModel;
        }
        return null;
    }

    public async list(per_page: number , offset_id: string , sort_field: string, sort_direction: SortDirection): Promise<BaseListDataModel<EntitiesModel>> {
        const sort = (sort_direction === SortDirection.ASC) ? "asc" : "desc" ;
        const docs = await firebase.firestore().collection(collections.collectionEntities)
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
    public async updateEntityHours(entity_id: string ,entities: EntityHoursModel[]): Promise<void> {
        const doc = await this.get(entity_id);
        if (doc) {
            doc.hours = entities;
            await this.updateEntity(entity_id, doc);
        }
    }

    public async locateEntity(entity_id: string): Promise<EntitiesModel | null> {
        const docRef = await firebase.firestore().collection(collections.collectionEntities).doc(entity_id);
        const doc = await docRef.get();
        if (doc && doc.exists) {
            const dta = await doc.data();
            dta.id = doc.id;
            return dta as EntitiesModel;
        }
        return null;
    }

    public async updateEntity(entity_id: string, entity: EntitiesModel): Promise<boolean> {
        const docRef = await firebase.firestore().collection(collections.collectionEntities).doc(entity_id);
        await docRef.set({ ...entity ,
            name: entity.name,
            alias_name: entity.alias_name,
            description: entity.description,
            phone: entity.phone,
            hours: entity.hours  || [] ,
            city: entity.city,
            country: entity.country,
            updatedAt: moment().toDate(),
        });
        return true;
    }
    public async deleteEntity(entity_id: string): Promise<void> {
        const batch = await firebase.firestore().batch();
        const docRef = await firebase.firestore().collection(collections.collectionEntityHours).doc(entity_id);
        batch.delete(docRef);
        await batch.commit();
    }
    public async cleanOpeningHours(entity_id: string) : Promise<void> {
        const doc = await this.get(entity_id);
        if (doc) {
            doc.hours = [];
            await this.updateEntity(entity_id, doc);
        }
    }
    public async bulkDelete(entity_ids: string[]) : Promise<void> {
        const batch = await firebase.firestore().batch();
        entity_ids.forEach(async entity_id => {
            const docRef = await firebase.firestore().collection(collections.collectionEntityHours).doc(entity_id);
            batch.delete(docRef);
        })
        await batch.commit();
    }
}

export default new EntityRepository();
