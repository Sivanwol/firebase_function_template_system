import { find, isEqual, trim } from "lodash";
import { PermissionsModel, RolesModel } from "../models/acl.model";
import AclRepository from "../repositories/Acl.repository";

class AclService {
    public async getRolesAndPermissions(): Promise<{ roles: RolesModel[], permissions: PermissionsModel[] }> {
        return AclRepository.fetchRolesAndPermissions();
    }

    public async hasMatchRolesOrPermissions(userRoles: string[],
                                            requiredRoles: string[],
                                            userPermissions: string[],
                                            requiredPermissions: string[]): Promise<boolean> {
        const aclData = await this.getRolesAndPermissions();
        let response = false;
        for (const role of userRoles) {
            const res = find(aclData.roles, r => isEqual(r.id, trim(role)));
            if (res) {
                const match = find(requiredRoles, r => (isEqual(trim(r), res.name)));
                if (match) {
                    response = true;
                }
            }
        }
        // no need check permissions for he got the relevant roles that matched
        if (!response) {
            for (const permission of userPermissions) {
                const res = find(aclData.permissions, r => isEqual(r.id, trim(permission)));
                if (res) {
                    const match = find(requiredPermissions, r => (isEqual(trim(r), res.name)));
                    if (match) {
                        response = true;
                    }
                }
            }
        }
        return response;
    }

}
export default new AclService();
