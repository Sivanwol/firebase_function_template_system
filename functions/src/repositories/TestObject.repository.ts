import * as admin from 'firebase-admin'
import { TestObject } from '../models/TestObject';
const collectionName = "testObject";
class TestObjectRepository {
  async create(client: TestObject) {
    return await admin.firestore().collection(collectionName).add(client)
  }
  async read() {
    return await admin.firestore().collection(collectionName).get()
  }
  async readAll() {
    const entities: TestObject[] = [];
    const snapshot = await admin.firestore().collection(collectionName).get()
    snapshot.docs.map(doc => {
      const dta = doc.data() as TestObject;
      dta.id = doc.id;
      entities.push(dta)
    });
    return entities;
  }
}

export default new TestObjectRepository()