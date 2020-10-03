import { BaseModel } from "../common/base.model";

export interface LocationGroupModel extends BaseModel {
    title: string;
    description: string;
    asset_icon_id: string;
    location_ids: string[];
}
