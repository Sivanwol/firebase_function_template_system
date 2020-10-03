
import { EntityRequest } from "../requests/EntityRequest";
import EntityRepository from "../repositories/Entity.repository";
import { EntitiesModel } from '../models/entities.model';
import { ListResponse } from "../common/base.response";
import { map } from "lodash";
import { SortDirection } from "../common/enums";
class EntityService {
    // TODO need add validation process so no same entity clone will be able to create
    public async createEntity(data: EntityRequest): Promise<string | null> {
        if (!data.hasOwnProperty("hours") || (data.hours && data.hours.length !== 7)) {
            data.hours = []; // something send wrong hours need be 7 recorded or null/undefined (when user didn't want set up)
        }
        const docRef = await EntityRepository.create(data.toEntityModel());
        if (docRef.id) {
            if (data.hours.length === 7) {
                await EntityRepository.updateEntityHours(docRef.id, data.hours);

            }
        }
        return (docRef.id) ? docRef.id : null;
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
                sort_dir: sortDirection,
            },
        };
    }
    public async locateEntity(entity_id: string): Promise<EntitiesModel | null> {
        const entity = await EntityRepository.locateEntity(entity_id);
        if (entity) {
            entity.id = entity_id;
            const hours = entity.hours;
            if (hours.length === 7) {
                entity.hours = map(hours, (hour) => hour);
            } else {
                entity.hours = [];
            }
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
            await EntityRepository.updateEntityHours(entity_id, data.hours);
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
