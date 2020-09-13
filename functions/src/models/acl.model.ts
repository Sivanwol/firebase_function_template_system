import { DocumentReference } from "@google-cloud/firestore";
import { BaseModel } from "../common/base.model";
export interface PermissionsModel extends BaseModel {
    name: string;
    description: string;
    is_active: boolean;
}
export interface RolesModel extends BaseModel {
    name: string;
    description: string;
    is_active: boolean;
    permissions: DocumentReference<PermissionsModel>[];
}