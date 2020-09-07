import { EntitiesModel } from "../models/entities.model";
import { EntityType } from "../common/enums";
export class EntityResponse implements EntitiesModel {
    public type: EntityType;
    public name: string;
    public alias_name: string;
    public asset_logo_id?: string;
    public asset_media_id?: string;
    public asset_cover_media_id?: string;
    public description: string;
    public status_id?: string;
    public intro: { content?: string; media_ids?: string[]; };
    public owner_user_id?: string;
    public contact_user_id?: string;
    public owner_first_name?: string;
    public owner_last_name?: string;
    public phone: string;
    public country: string;
    public city: string;
    public breaches_ids?: string[];
    public parking_location_ids?: string[];
    public socials: { linkedin?: string; facebook?: string; whatsup?: number; };
    public main_location_id?: string;
    public location_group_id?: string;
    public id?: string;
    public change_by_id?: string;
    public update_at?: Date;
    public create_at?: Date;
}
