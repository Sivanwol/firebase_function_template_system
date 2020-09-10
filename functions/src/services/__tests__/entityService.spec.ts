/* tslint:disable */
// Test framework.
import 'jest'
import { EntityRequest, EntityHoursRequest } from '../../requests/EntityRequest';
import EntityService from '../entity.service';
import * as faker from 'faker';
import { EntityType } from '../../common/enums';
import '../../mocks/firebase.mock'
let entityData = new EntityRequest();
describe('Entity Service Testing', () => {
    describe('Testing Create Entity', () => {
        beforeEach(() => {
            entityData = new EntityRequest;
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
                entityData.hours.push(entityDataHour);
            }
            let entityDataHour = new EntityHoursRequest();
            entityDataHour.day = 6;
            entityDataHour.close = true;
            entityData.hours.push(entityDataHour);
            entityDataHour = new EntityHoursRequest();
            entityDataHour.day = 7;
            entityDataHour.all_day = true;
            entityData.hours.push(entityDataHour);


            entityData.phone = faker.phone.phoneNumber();
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
                    entity.hours.forEach((hour, idx) => {
                        const exportHour = entityData.hours[idx];
                        expect(exportHour).toBeDefined();
                        expect(exportHour).toEqual(hour);
                    });
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
            const updateEntity = await EntityService.updateEntity(insert_id, entityData); 
            expect(updateEntity).not.toBeNull();
            if (updateEntity) {
                expect(insert_id).toEqual(updateEntity.id);
                expect(updateEntity.name).toEqual(entityData.name);
                expect(updateEntity.type).toEqual(entityData.type);
                expect(updateEntity.country).toEqual(entityData.country);
                expect(updateEntity.name).toEqual(entityData.name);
                expect(updateEntity.phone).toEqual(entityData.phone);

                // let check the open hours 
                expect(updateEntity.hours).toHaveLength(entityData.hours.length);
                updateEntity.hours.forEach((hour, idx) => {
                    const exportHour = entityData.hours[idx];
                    console.log("Hour Check" , exportHour , hour);
                    // expect(exportHour).toBeDefined();
                    // expect(exportHour).toEqual(hour);
                });
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
    })
});