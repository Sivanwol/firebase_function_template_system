import { DocumentReference } from '@google-cloud/firestore';
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { BaseModel, IBaseModel } from "../common/base.model";
import { EntityStatus, EntityType } from "../common/enums";
import { EntityHoursModel } from "./entityHours.model";
import { LocationsModel } from './locations.model';

export interface IEntitiesModel extends IBaseModel {
    type: EntityType;
    name: string;
    alias_name: string;
    asset_logo_id?: string;
    asset_media_id?: string;
    asset_cover_media_id?: string;
    description: string;
    status: EntityStatus;
    owner_user_id?: string;
    contact_user_id?: string;
    owner_first_name?: string;
    owner_last_name?: string;
    phone: string;
    country: string;
    city: string;
    breaches_ids?: string[];
    parking_location_ids?: DocumentReference<EntitiesModel>[];
    main_location_id?: DocumentReference<LocationsModel>;
    location_group_id?: string;
    hours?: EntityHoursModel[];
    visibility: string;
}
export class EntitiesModel extends BaseModel {
    @IsEnum(EntityType)
    public type: EntityType;
    @IsString()
    public name: string;
    @IsOptional()
    @IsString()
    public alias_name: string;
    @IsOptional()
    @IsString()
    public asset_logo_id?: string;
    @IsOptional()
    @IsString()
    public asset_media_id?: string;
    @IsOptional()
    @IsString()
    public asset_cover_media_id?: string;
    @IsString()
    public description: string;
    @IsString()
    @IsEnum(EntityStatus)
    public status?: EntityStatus;
    @IsOptional()
    @IsString()
    public owner_user_id?: string;
    @IsOptional()
    @IsString()
    public contact_user_id?: string;
    @IsOptional()
    @IsString()
    public owner_first_name?: string;
    @IsOptional()
    @IsString()
    public owner_last_name?: string;
    @IsString()
    public phone: string;
    @IsString()
    public country: string;
    @IsString()
    public city: string;
    @IsArray()
    @IsObject({ each: true })
    public breaches_ids?: DocumentReference<EntitiesModel>[];
    @IsArray()
    public parking_location_ids?: string[];
    @IsString()
    public main_location_id?: string;
    @IsString()
    public location_group_id?: string;
    @IsArray()
    public hours?: EntityHoursModel[];
    constructor(params: IEntitiesModel, validate: boolean = true) {
        super(params);
        this.name = params.name;
        this.alias_name = params.alias_name;
        this.asset_cover_media_id = params.asset_cover_media_id;
        this.alias_name = params.alias_name;
        this.asset_logo_id = params.asset_logo_id;
        this.asset_media_id = params.asset_media_id;
        this.breaches_ids = params.breaches_ids;
        this.city = params.city;
        this.contact_user_id = params.contact_user_id;
        this.country = params.country;
        this.description = params.description;
        this.hours = params.hours;
        this.main_location_id = params.main_location_id;
        this.location_group_id = params.location_group_id;
        this.owner_first_name = params.owner_first_name;
        this.owner_last_name = params.owner_last_name;
        this.owner_user_id = params.owner_user_id;
        this.status = params.status;

        if (validate) {
            this.validate();
        }
    }
}
