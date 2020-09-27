/* tslint:disable */
// Test framework.
import 'jest'
import { EntityRequest, EntityHoursRequest } from '../../requests/EntityRequest';
import EntityService from '../entity.service';
import * as faker from 'faker';
import { EntityType } from '../../common/enums';
import * as admin from "firebase-admin"
import { FirebaseHandler } from '../../common/firebase';
// import '../../mocks/firebase.mock'
let entityData = new EntityRequest();
function requestNewEntityMock() {

    const entityData = new EntityRequest;
    entityData.type = EntityType.Shop;
    entityData.city = faker.address.city();
    entityData.country = faker.address.countryCode();
    entityData.name = faker.company.companyName();
    entityData.description = faker.lorem.sentence(1);
    entityData.alias_name = faker.company.companyName();
    entityData.hours = [];
    for (let i = 1; i <= 5; i++) {
        const entityDataHour = new EntityHoursRequest();
        entityDataHour.from = `${faker.random.number({ min: 10, max: 15 })}:00`;
        entityDataHour.to = `${faker.random.number({ min: 16, max: 24 })}:00`;
        entityDataHour.day = i - 1;
        entityData.hours.push(entityDataHour.toEntityHourModel());
    }
    let entityDataHour = new EntityHoursRequest();
    entityDataHour.day = 6;
    entityDataHour.close = true;
    entityData.hours.push(entityDataHour.toEntityHourModel());
    entityDataHour = new EntityHoursRequest();
    entityDataHour.day = 7;
    entityDataHour.all_day = true;
    entityData.hours.push(entityDataHour.toEntityHourModel());


    entityData.phone = faker.phone.phoneNumber();
    return entityData;
}
describe('Entity Service Testing', () => {
    beforeAll(async () => {
        await FirebaseHandler.setupFirebaseTest(admin);
    })
    describe('Testing Entity basic actions', () => {
        beforeEach(() => {
            entityData = requestNewEntityMock();
        })
        test('should create entity with empty opening hour', async () => {
            entityData.hours = [];
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
        test('should create entity with opening hour', async () => {

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
                    // let check the open hours 
                    expect(entity.hours).toHaveLength(7);
                } else {
                    expect(entity).not.toBeUndefined();
                }
            }
        })

        test('should getting entity' , async () => {
            const insert_id = await EntityService.createEntity(entityData);
            expect(insert_id).not.toBeNull();
            if (insert_id) {
                const entity = await EntityService.getEntity(insert_id);
                
                expect(insert_id).toEqual(entity.id);
                expect(entity.name).toEqual(entityData.name);
                expect(entity.type).toEqual(entityData.type);
                expect(entity.country).toEqual(entityData.country);
                expect(entity.name).toEqual(entityData.name);
                expect(entity.phone).toEqual(entityData.phone);
                // let check the open hours 
                expect(entity.hours).toHaveLength(7);
                entity.hours.forEach((hour, idx) => {
                    const exportHour = entityData.hours[idx];
                    // expect(exportHour).toBeDefined();
                    // expect(exportHour).toEqual(hour);
                    console.log("Hour Check" , exportHour , hour);
                });
            }
        })
        test('should update entity with correct data', async () => {

            const insert_id = await EntityService.createEntity(entityData);
            expect(insert_id).not.toBeNull();
            entityData.name = entityData.name + ' Test';
            const updateEntityStatus = await EntityService.updateEntity(insert_id, entityData); 
            expect(updateEntityStatus).not.toBeNull();
            expect(updateEntityStatus).toBeTruthy()
            const response = await EntityService.getEntity(insert_id);
            if (response) {
                expect(insert_id).toEqual(response.id);
                expect(response.name).toEqual(entityData.name);
                expect(response.type).toEqual(entityData.type);
                expect(response.country).toEqual(entityData.country);
                expect(response.name).toEqual(entityData.name);
                expect(response.phone).toEqual(entityData.phone);

                // let check the open hours 
                expect(response.hours).toHaveLength(entityData.hours.length);
            }
        })

        test('should remove entity' , async ()=>{
            const insert_id = await EntityService.createEntity(entityData);
            const removeEntity = await EntityService.deleteEntity(insert_id); 
            expect(removeEntity).toBeTruthy();
            if (removeEntity) {
                const entity = await EntityService.getEntity(insert_id);
                expect(entity).toBeNull();
            }
        })
        test("should clear opening hour of entity" ,  async () => {
            const insert_id = await EntityService.createEntity(entityData);
            expect(insert_id).not.toBeNull();
            if (insert_id) {
                const cleared = await EntityService.cleanOpeningHours(insert_id);
                const entity = await EntityService.getEntity(insert_id);
                expect(cleared).toBeTruthy();
                expect(entity).toBeDefined();
                expect(entity.hours).toHaveLength(0);

            }
        })
        test('should remove entities (as bulk action)' , async ()=>{
            const entities_ids: string[] = [];
            entities_ids.push(await EntityService.createEntity(requestNewEntityMock()));
            entities_ids.push(await EntityService.createEntity(requestNewEntityMock()));
            entities_ids.push(await EntityService.createEntity(requestNewEntityMock()));
            await EntityService.bulkDelete(entities_ids); 
            entities_ids.forEach(async entity_id => {
                const entity = await EntityService.getEntity(entity_id);
                expect(entity).toBeNull();
            });
        })
    })
});