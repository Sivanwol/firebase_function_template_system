import { BaseModel } from "../common/base.model";

export interface LocationsModel extends BaseModel {
    lat: number;
    long: number;
    title: string;
    asset_small_image_id: string;
    subtitle: string;
    entity_id: string;
    address: string;
}