
import { EntityRequest } from '../requests/EntityRequest';
import EntityRepository from '../repositories/Entity.repository';
class EntityService {
    public async createEntity(data: EntityRequest) {
        if (!data.hasOwnProperty('hours') || (data.hours && data.hours.length !== 7)) {
            data.hours = []; // something send wrong hours need be 7 recorded or null/undefined (when user didn't want set up)
        }
        const docRef = await EntityRepository.create(data.toEntityModel());
        EntityRepository.createEntityHour(data.toEntityHoursModel(docRef.id));
        return docRef.id;
    }
}
export default new EntityService;