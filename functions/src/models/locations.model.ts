import { DocumentReference } from "@google-cloud/firestore";
import { IsLatitude, IsLongitude, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { BaseModel, IBaseModel } from "../common/base.model";
import { EntitiesModel } from "./entities.model";
import { UsersModel } from "./users.model";

export interface ILocationsModel extends IBaseModel {
    lat: number;
    long: number;
    title: string;
    asset_small_image?: string;
    subtitle: string;
    entity?: DocumentReference<EntitiesModel>;
    address: string;
    owner: DocumentReference<UsersModel>;
}
export interface IUserFavoriteLocations extends ILocationsModel {
    notes: string;
}

export class LocationsModel extends BaseModel {
    @IsLatitude()
    @IsNumber()
    public lat: number;
    @IsLongitude()
    @IsNumber()
    public long: number;
    @IsString()
    public title: string;
    @IsString()
    public asset_small_image?: string;
    @IsString()
    public subtitle: string;
    @IsObject()
    public entity?: DocumentReference<EntitiesModel>;
    @IsString()
    public address: string;
    @IsObject()
    public owner: DocumentReference<UsersModel>;

    constructor(params: ILocationsModel, validate: boolean = true) {
        super(params);
        this.address = params.address;
        this.asset_small_image = params.asset_small_image;
        this.entity = params.entity;
        this.lat = params.lat;
        this.long = params.long;
        this.title = params.title;
        this.subtitle = params.subtitle;
        this.owner = params.owner;

        if (validate) {
            this.validate();
        }
    }
}

export class UserFavoriteLocations extends LocationsModel {
    @IsString()
    @IsOptional()
    public notes: string;

    constructor(params: IUserFavoriteLocations, validate: boolean = true) {
        super(params, validate);
        this.notes = params.notes;

        if (validate) {
            this.validate();
        }
    }
}
