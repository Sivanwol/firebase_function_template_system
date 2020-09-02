import { BaseModel } from "../common/base.model";

export interface EntityStatusModel extends BaseModel {
    name: string;
    description: string;
    is_draft: boolean;
    is_active: boolean;
    is_publish: boolean;
    is_suspend: boolean;
}