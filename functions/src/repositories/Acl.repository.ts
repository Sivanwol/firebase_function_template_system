import { RolesModel, PermissionsModel, collections } from '../models';
import * as firebase from "firebase-admin";
class AclRepository {
    public async fetchRolesAndPermissions(): Promise<{ roles: RolesModel[], permissions: PermissionsModel[] }> {
        const response = { roles: [], permissions: [] };
        const roles = await firebase.firestore().collection(collections.collectionsRoles).get();
        if (!roles.empty) {
            roles.docs.map(doc => {
                response.roles.push({ id: doc.id, ...doc.data() });
            });
        }

        const permissions = await firebase.firestore().collection(collections.collectionsPermissions).get();
        if (!permissions.empty) {
            permissions.docs.map(doc => {
                response.permissions.push({ id: doc.id, ...doc.data() });
            });
        }

        return response;
    }
}
export default new AclRepository();
