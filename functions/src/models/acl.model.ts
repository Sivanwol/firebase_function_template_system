import { DocumentReference } from "@google-cloud/firestore";
import { IsString, IsOptional, IsBoolean, IsObject } from "class-validator";
import { BaseModel, IBaseModel } from "../common/base.model";
export interface IPermissionsModel extends IBaseModel {
    name: string;
    description: string;
    is_active: boolean;
}
export interface IRolesModel extends IPermissionsModel {
    permissions: DocumentReference<PermissionsModel>[];
}

export class PermissionsModel extends BaseModel {
    @IsString()
    public name: string;
    @IsString()
    @IsOptional()
    public description: string;
    @IsBoolean()
    public is_active: boolean;
    constructor(params: IPermissionsModel, validate: boolean = true) {
        super(params);
        this.is_active = params.is_active;
        this.name = params.name;
        this.description = params.description;

        if (validate) {
            this.validate();
        }
    }
}

export class RolesModel extends PermissionsModel  {
    @IsObject({ each: true})
    public permissions: DocumentReference<PermissionsModel>[];
    constructor(params: IRolesModel, validate: boolean = true) {
        super(params, validate);
        this.permissions = params.permissions;

        if (validate) {
            this.validate();
        }
    }
}
