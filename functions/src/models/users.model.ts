import { BaseModel, IBaseModel } from "../common/base.model";
import { GenderEnum } from "../common/enums";
import { DocumentReference } from "@google-cloud/firestore";
import { IsBoolean, IsEmail, IsEnum, IsObject, IsOptional, IsString } from "class-validator";

export interface IUsersModel extends IBaseModel {
    uuid: string; // firebase user id
    loginToken: string;
    location?: DocumentReference<FirebaseFirestore.DocumentData>;
    email: string;
    phone: string;
    subtitle: string;
    gender: GenderEnum;
    favoriteLocations: DocumentReference<FirebaseFirestore.DocumentData>[];
    allow_location: boolean;
    approved_email: boolean;
    first_time_login: boolean;
    roles: DocumentReference<FirebaseFirestore.DocumentData>[];
    permissions:  DocumentReference<FirebaseFirestore.DocumentData>[];
}

export class UsersModel extends BaseModel  {
    @IsString()
    public uuid: string; // firebase user id
    @IsString()
    public loginToken: string;
    @IsObject()
    @IsOptional()
    public location?: DocumentReference<FirebaseFirestore.DocumentData>;
    @IsEmail()
    public email: string;
    @IsString()
    @IsOptional()
    public phone: string;
    @IsEnum(GenderEnum)
    public gender: GenderEnum;
    @IsObject({ each: true })
    public favoriteLocations: DocumentReference<FirebaseFirestore.DocumentData>[];
    @IsBoolean()
    public allow_location: boolean;
    @IsBoolean()
    public approved_email: boolean;
    @IsBoolean()
    public first_time_login: boolean;
    @IsObject({ each: true })
    public roles: DocumentReference<FirebaseFirestore.DocumentData>[];
    @IsObject({ each: true })
    public permissions:  DocumentReference<FirebaseFirestore.DocumentData>[];
    constructor(params: IUsersModel, validate: boolean = true) {
        super(params);
        this.uuid = params.uuid;
        this.allow_location = params.allow_location;
        this.approved_email = params.approved_email;
        this.email = params.email;
        this.favoriteLocations = params.favoriteLocations;
        this.first_time_login = params.first_time_login;
        this.gender = params.gender;
        this.location = params.location;
        this.loginToken = params.loginToken;
        this.roles = params.roles;
        this.permissions = params.permissions;

        if (validate) {
            this.validate();
        }
    }
}
