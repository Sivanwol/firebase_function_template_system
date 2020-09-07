
import { EntityRequest } from "../requests/EntityRequest";
import EntityRepository from "../repositories/Entity.repository";
import { EntitiesModel } from "../models/entities.model";
import { SortDirection } from "../common/enums";
class EntityService {
    // TODO need add validation process so no same entity clone will be able to create
    public async createEntity(data: EntityRequest): Promise<string | null> {
        if (!data.hasOwnProperty("hours") || (data.hours && data.hours.length !== 7)) {
            data.hours = []; // something send wrong hours need be 7 recorded or null/undefined (when user didn't want set up)
        }
        const docRef = await EntityRepository.create<EntitiesModel | undefined>(data.toEntityModel());
        const entity_id = docRef!.id;
        if (entity_id) {
            if (data.hours.length === 7) {
                await EntityRepository.createEntityHour(data.toEntityHoursModel(entity_id));

            }
        }
        return (entity_id) ? entity_id : null;
    }

    public async listEntities(per_page: number, page: number ,  sortField: string, sortDirection: SortDirection) {
        // TODO this what need be implemented
        // https://stackoverflow.com/questions/50922417/how-to-paginate-or-infinite-scroll-by-number-of-items-in-firestore
        // https://firebase.google.com/docs/firestore/query-data/query-cursors
    }
    public async locateEntity(entity_id: string): Promise<EntitiesModel | undefined> {
        const entity = await EntityRepository.locateEntity<EntitiesModel>(entity_id);
        if (entity) {
            entity.id = entity_id;
        }
        return entity;
    }

    public async updateEntity(entity_id: string, data: EntityRequest): Promise<boolean> {
        const foundEntity = await this.locateEntity(entity_id);
        if (foundEntity) {
            if (!data.hasOwnProperty("hours") || (data.hours && data.hours.length !== 7)) {
                data.hours = []; // incorrect format so we ignore and won't be update the hours
            }
            await EntityRepository.updateEntity(entity_id, data.toEntityModel());
            await EntityRepository.createEntityHour(data.toEntityHoursModel(entity_id));
            return true;
        }
        return false;
    }
    public async deleteEntity(entity_id: string): Promise<boolean> {
        const foundEntity = await this.locateEntity(entity_id);
        if (foundEntity) {
            await EntityRepository.deleteEntity(entity_id);
            return true;
        }
        return false;
    }
}
export default new EntityService();
