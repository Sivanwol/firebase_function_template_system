import { BaseEntityModel } from "../common/base.model";
import { EntityHoursModel } from "./entityHours.model";

export interface EntitiesModel extends BaseEntityModel {
    name: string;
    alias_name: string;
    asset_logo_id: string;
    asset_media_id: string; 
    asset_cover_media_id: string;
    description: string;
    status_id: string;
    intro: {
        content: string
        media_ids: string[]
    }
    hours: EntityHoursModel;
    owner_user_id: string;
    contact_user_id: string;
    owner_first_name: string;
    owner_last_name: string;
    phone: number;
    country: string;
    city: string;
    breaches_ids: string[];
    parking_location_ids: string[];
    socials: {
        linkedin: string;
        facebook: string;
        whatsup: number;
    };
    main_location_id: string;
    location_group_id: string;
}