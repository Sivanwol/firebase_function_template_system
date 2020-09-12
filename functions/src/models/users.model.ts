import { BaseModel } from "../common/base.model";
import { GenderEnum } from "../common/enums";
import { LocationsModel, UserFavoriteLocations } from "./locations.model";

export interface UserProfile {
    phone: string;
    subtitle: string;
    gender: GenderEnum;
    myFavoriteLocations: UserFavoriteLocations[];
}

export interface FavoriteLocations extends BaseModel {
    location: UserFavoriteLocations;
    owner_user_id: string;
    register_at: Date;
}

export interface UserMetaData {
    allow_location: boolean;
    approved_email: boolean;
    first_time_login: boolean;
}

export interface UsersModel extends BaseModel {
    uuid: string; // firebase user id
    loginToken: string;
    location?: LocationsModel;
    email: string;
    profile: UserProfile;
    meta: UserMetaData;
}