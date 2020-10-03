import { BaseModel, IBaseModel } from "../common/base.model";
import { GenderEnum } from "../common/enums";
import { IsBoolean, IsEmail, IsEnum, IsObject, IsOptional, IsString } from "class-validator";

export interface IUsersModel extends IBaseModel {
    uuid: string; // firebase user id
    location?: string;
    email: string;
    displayName: string;
    phone: string;
    subtitle: string;
    gender: GenderEnum;
    favoriteLocations: string[];
    allow_location: boolean;
    first_time_login: boolean;
    roles: string[];
    permissions: string[];
}

export class UsersModel extends BaseModel  {
    @IsString()
    public uuid: string; // firebase user id
    @IsString()
    public displayName: string;
    @IsObject()
    @IsOptional()
    public location?: string;
    @IsEmail()
    public email: string;
    @IsString()
    @IsOptional()
    public phone: string;
    @IsEnum(GenderEnum)
    public gender: GenderEnum;
    @IsObject({ each: true })
    public favoriteLocations: string[];
    @IsBoolean()
    public allow_location: boolean;
    @IsBoolean()
    public first_time_login: boolean;
    @IsObject({ each: true })
    public roles: string[];
    @IsObject({ each: true })
    public permissions:  string[];
    constructor(params: IUsersModel, validate: boolean = true) {
        super(params);
        this.uuid = params.uuid;
        this.allow_location = params.allow_location;
        this.email = params.email;
        this.favoriteLocations = params.favoriteLocations;
        this.first_time_login = params.first_time_login;
        this.gender = params.gender;
        this.location = params.location;
        this.displayName = params.displayName;
        this.roles = params.roles;
        this.permissions = params.permissions;

        if (validate) {
            this.validate();
        }
    }
}
