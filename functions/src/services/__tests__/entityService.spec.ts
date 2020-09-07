/* tslint:disable */
// Test framework.
import 'jest'
import { EntityRequest } from '../../requests/EntityRequest';
import EntityService from '../entity.service';
import * as faker from 'faker';
import { EntityType } from '../../common/enums';
// import collection from '../../common/collections';
// import { FirebaseHandler } from '../../common/firebase';
import '../../mocks/firebase.mock'
let entityData = new EntityRequest();
describe('Entity Service Testing', () => {
    beforeEach(() => {
        entityData = new EntityRequest;
        entityData.type = EntityType.Shop;
        entityData.city = faker.address.city();
        entityData.country = faker.address.countryCode();
        entityData.name = faker.company.companyName();
        entityData.description = faker.lorem.sentence(1);
        entityData.alias_name = faker.company.companyName();
        entityData.hours = [];
        entityData.phone = faker.phone.phoneNumber();
    })
    test('should create entity with empty opening hour', async () => {
        const insert_id = await EntityService.createEntity(entityData);
        expect(insert_id).not.toBeNull();
        if (insert_id) {
            const entity = await EntityService.locateEntity(insert_id);
            if (entity) {
                expect(insert_id).toEqual(entity.id);
                expect(entity.name).toEqual(entityData.name);
                expect(entity.type).toEqual(entityData.type);
                expect(entity.country).toEqual(entityData.country);
                expect(entity.name).toEqual(entityData.name);
                expect(entity.phone).toEqual(entityData.phone);
            } else {
                expect(entity).not.toBeUndefined();
            }
        }

    });
});