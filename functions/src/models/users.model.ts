import { BaseEntityModel } from "../common/base.model";
import { LocationsModel } from "./locations.model";

interface UserProfile {
    phone: string;
    subtitle: string;
    
}

export interface EntitiesModel extends BaseEntityModel {
    uuid: string; // firebase user id
    loginToken: string;
    location: LocationsModel;
    email: string;
    profile: UserProfile;
}