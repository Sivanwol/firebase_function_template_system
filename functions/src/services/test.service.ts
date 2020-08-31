import { TestObject } from "../models/TestObject";
import TestObjectRepository from '../repositories/TestObject'
class TestService {
    async addNewTest(data: TestObject) {
        await TestObjectRepository.create(data);
    }
    async readAll() {
        return await TestObjectRepository.readAll();
    }
}
export default new TestService