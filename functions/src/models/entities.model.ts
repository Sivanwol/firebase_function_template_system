import { DocumentReference } from '@google-cloud/firestore';
import { IsArray, IsEnum, IsISO31661Alpha2, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseModel, IBaseModel } from "../common/base.model";
import { EntityStatus, EntityType, EntityVisibility } from "../common/enums";

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
    breaches?: DocumentReference<FirebaseFirestore.DocumentData>[];
    parking_location?: DocumentReference<FirebaseFirestore.DocumentData>[];
    main_location?: DocumentReference<FirebaseFirestore.DocumentData>;
    location_group_id?: string;
    hours?: DocumentReference<FirebaseFirestore.DocumentData>[];
    visibility: EntityVisibility;
}
export class EntitiesModel extends BaseModel {
    @IsEnum(EntityType)
    public type: EntityType;
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    public name: string;
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
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
    @IsISO31661Alpha2()
    public country: string;
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    public city: string;
    @IsArray()
    @IsObject({ each: true })
    public breaches?: DocumentReference<FirebaseFirestore.DocumentData>[];
    @IsArray()
    public parking_location?: DocumentReference<FirebaseFirestore.DocumentData>[];
    @IsString()
    public main_location?: DocumentReference<FirebaseFirestore.DocumentData>;
    @IsString()
    public location_group_id?: string;
    @IsArray()
    public hours?: DocumentReference<FirebaseFirestore.DocumentData>[];
    @IsEnum(EntityVisibility)
    public visibility: EntityVisibility;
    constructor(params: IEntitiesModel, validate: boolean = true) {
        super(params);
        this.name = params.name;
        this.alias_name = params.alias_name;
        this.asset_cover_media_id = params.asset_cover_media_id;
        this.alias_name = params.alias_name;
        this.asset_logo_id = params.asset_logo_id;
        this.asset_media_id = params.asset_media_id;
        this.breaches = params.breaches;
        this.city = params.city;
        this.contact_user_id = params.contact_user_id;
        this.country = params.country;
        this.description = params.description;
        this.hours = params.hours;
        this.main_location = params.main_location;
        this.location_group_id = params.location_group_id;
        this.owner_first_name = params.owner_first_name;
        this.owner_last_name = params.owner_last_name;
        this.owner_user_id = params.owner_user_id;
        this.status = params.status;
        this.visibility = params.visibility;

        if (validate) {
            this.validate();
        }
    }
}
