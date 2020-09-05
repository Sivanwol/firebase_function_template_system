import { TestObject } from '../models/TestObject';
import { FirebaseHandler } from '../common/firebase';
const collectionName = "testObject";
class TestObjectRepository {
  async create(client: TestObject) {
    return await FirebaseHandler.db.collection(collectionName).add(client)
  }
  async read() {
    return await FirebaseHandler.db.collection(collectionName).get()
  }
  async readAll() {
    const entities: TestObject[] = [];
    const snapshot = await FirebaseHandler.db.collection(collectionName).get()
    snapshot.docs.map(doc => {
      const dta = doc.data() as TestObject;
      dta.id = doc.id;
      entities.push(dta)
    });
    return entities;
  }
}

export default new TestObjectRepository()