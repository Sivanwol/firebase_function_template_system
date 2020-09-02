import { BaseModel } from "../common/base.model";
import { AssetType } from "../common/enums";
export interface AssetsModel extends BaseModel {
    type: AssetType;
    file_location: string;
    file_path: string;
    file_name: string;
    file_size: string;
    upload_by_id: string;
    upload_at: Date;
}