
import { EntityRequest } from "../requests/EntityRequest";
import EntityRepository from "../repositories/Entity.repository";
import { EntitiesModel } from '../models/entities.model';
import { SortDirection } from "../common/enums";
import { ListResponse } from "../common/base.response";
class EntityService {
    // TODO need add validation process so no same entity clone will be able to create
    public async createEntity(data: EntityRequest): Promise<string | null> {
        if (!data.hasOwnProperty("hours") || (data.hours && data.hours.length !== 7)) {
            data.hours = []; // something send wrong hours need be 7 recorded or null/undefined (when user didn't want set up)
        }
        const docRef = await EntityRepository.create(data.toEntityModel());
        const entity_id = docRef!.id;
        if (entity_id) {
            if (data.hours.length === 7) {
                await EntityRepository.createEntityHour(data.toEntityHoursModel(entity_id));

            }
        }
        return (entity_id) ? entity_id : null;
    }

    public async getEntity(entity_id: string): Promise<EntitiesModel | null> {
        return await this.locateEntity(entity_id);
    }

    public async listEntities(per_page: number, offset_id: string, sortField: string, sortDirection: SortDirection): Promise<ListResponse<EntitiesModel>> {
        const list = await EntityRepository.list(per_page, offset_id, sortField, sortDirection);
        return {
            items: list.items,
            meta: {
                total_entities: list.size,
                last_offset_id: offset_id,
                sort_field: sortField,
                sort_direction: sortDirection,
            }
        }
    }
    public async locateEntity(entity_id: string): Promise<EntitiesModel | null> {
        const entity = await EntityRepository.locateEntity(entity_id);
        if (entity) {
            entity.id = entity_id;
            const hours = await EntityRepository.getEntityHours(entity_id);
            if (hours.size === 7) {
                entity.hours = hours.items;
            } else {
                entity.hours = [];
            }
        }
        return entity;
    }

    public async updateEntity(entity_id: string, data: EntityRequest): Promise<EntitiesModel | null> {
        const foundEntity = await this.locateEntity(entity_id);
        if (foundEntity) {
            if (!data.hasOwnProperty("hours") || (data.hours && data.hours.length !== 7)) {
                data.hours = []; // incorrect format so we ignore and won't be update the hours
            }
            await EntityRepository.updateEntity(entity_id, data.toEntityModel());
            await EntityRepository.updateEntityHours(entity_id, data.toEntityHoursModel(entity_id));
            return await this.getEntity(entity_id);
        }
        return null;
    }
    public async deleteEntity(entity_id: string): Promise<boolean> {
        const foundEntity = await this.locateEntity(entity_id);
        if (foundEntity) {
            await EntityRepository.deleteEntity(entity_id);
            return true;
        }
        return false;
    }
    public async cleanOpeningHours(entity_id: string): Promise<boolean> {
        const foundEntity = await this.locateEntity(entity_id);
        if (foundEntity) {
            await EntityRepository.cleanOpeningHours(entity_id);
            return true;
        }
        return false;
    }

    public async bulkDelete(entities_ids: string[]): Promise<void> {
        await EntityRepository.bulkDelete(entities_ids);
    }
}
export default new EntityService();
