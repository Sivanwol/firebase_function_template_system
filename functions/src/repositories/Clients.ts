import * as admin from 'firebase-admin'

class clientRepository {
  create(client: any) {
    return admin.firestore().collection('clients').add(client)
  }
  read() {
    return admin.firestore().collection('clients').get()
  }
  update(id: any, client: any) {
    return admin.firestore().collection('clients').doc(id).update(client)
  }
  delete(id: any) {
    return admin.firestore().collection('clients').doc(id).delete()
  }
  find(id: any) {
    return admin.firestore().collection('clients').doc(id).get()
  }
}

export default new clientRepository()