
import { EntityRequest } from "../requests/EntityRequest";
import EntityRepository from "../repositories/Entity.repository";
import { EntitiesModel } from "../models/entities.model";
class EntityService {
    // TODO need add validation process so no same entity clone will be able to create
    public async createEntity(data: EntityRequest): Promise<string | null> {
        if (!data.hasOwnProperty("hours") || (data.hours && data.hours.length !== 7)) {
            data.hours = []; // something send wrong hours need be 7 recorded or null/undefined (when user didn't want set up)
        }
        const docRef = await EntityRepository.create<EntitiesModel | undefined>(data.toEntityModel());
        if (docRef) {
            if (data.hours.length === 7) {
                await EntityRepository.createEntityHour(data.toEntityHoursModel(docRef.id));

            }
        }
        const entity_id = docRef!.id;
        return (entity_id) ? entity_id : null;
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
