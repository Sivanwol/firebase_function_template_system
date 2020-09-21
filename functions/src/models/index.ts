
import { DalModel, Firestore } from 'simple-cached-firestore';
import { Redis } from '@ehacke/redis';
import admin from 'firebase-admin';
import { EntitiesModel } from './entities.model';
import collection from "../common/collections";
const dbConnections = { firestore: admin.firestore(), redis: new Redis() };
class CacheDB<T extends DalModel> {
    constructor(private fireStoreModel: T extends DalModel) { }

    public toCacheModel(collection: string): Firestore<T> {
        // Create instance of wrapper
        const cachedFirestore = new Firestore<T>(dbConnections);

        const firebaseConfig = {
            collection,

            // The object read from the db will have Firebase Timestamps in place of Dates, that the ValidatedClass must convert
            convertFromDb: (params) => new this.fireStoreModel(params),

            // The object being written to the db will be automatically scanned for Dates, which are converted to Timestamps
            // NOTE: This scanning does have a performance hit, but it's assumed writes are infrequent compared to reads
            convertForDb: (params) => params,
        };

        const cacheConfig = {
            cacheTtlSec: 5,
            // Objects read from the cache will obviously have their Dates as ISO strings, ValidatedClass must convert to Date
            parseFromCache: (instance) => new this.fireStoreModel(JSON.parse(instance)),
            stringifyForCache: (instance: T) => JSON.stringify(instance),
        };

        // Configure simple-cached-firestore before use
        cachedFirestore.configure(firebaseConfig, cacheConfig);
        return cachedFirestore;
    }
}
export * from './acl.model';
export * from './users.model';
export * from './entityHours.model';
export * from './locations.model';

export {collection , EntitiesModel};

export const entityModel = (new CacheDB<EntitiesModel>(EntitiesModel)).toCacheModel(collection.collectionEntities);