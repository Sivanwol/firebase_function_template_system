import { DayOfWeek, EntityStatus, EntityType, EntityVisibility } from "../common/enums";
import { IsBoolean, IsInt, IsOptional, IsEnum, IsUrl, MaxLength, IsString, ValidateNested, IsPhoneNumber, IsISO31661Alpha2, MinLength, Length, Matches } from "class-validator";
import { EntitiesModel } from "../models/entities.model";
import { EntityHoursModel } from '../models/entityHours.model';
import moment from "moment";
import { DocumentReference } from "@google-cloud/firestore";

export class EntitySocial {
    @IsOptional()
    @IsUrl()
    public linkedin: string;
    @IsOptional()
    @IsUrl()
    public facebook: string;
    @IsOptional()
    @IsInt()
    public whatsup: number;
}
export class EntityHoursRequest {

    @IsEnum(DayOfWeek)
    public day: DayOfWeek;
    @IsOptional()
    @IsString()
    @Length(5, 5)
    @Matches("/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/")
    public from: string;
    @IsOptional()
    @IsString()
    @Length(5, 5)
    @Matches("/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/")
    public to: string;
    @IsOptional()
    @IsBoolean()
    public close: boolean;
    @IsOptional()
    @IsBoolean()
    public all_day: boolean;

    public toEntityHourModel(entity:DocumentReference<FirebaseFirestore.DocumentData>): EntityHoursModel {
        return new EntityHoursModel({
            id: null,
            entity,
            day: this.day,
            from: this.from || "",
            to: this.to || "",
            close: this.close || false,
            all_day: this.all_day || false,
            createdAt: moment().toDate(),
            updatedAt: moment().toDate(),
        }, false);
    }
}
export class EntityRequest {
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
    public description: string;
    @IsOptional()
    @ValidateNested({ each: true })
    public hours: EntityHoursRequest[];
    @IsPhoneNumber(null)
    public phone: string;
    @IsString()
    @IsISO31661Alpha2()
    public country: string;
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    public city: string;
    @IsOptional()
    @ValidateNested()
    public socials?: EntitySocial;
    public visibility: EntityVisibility;

    public toEntityModel(): EntitiesModel {
        return new EntitiesModel({
            id: null,
            type: this.type,
            name: this.name,
            alias_name: this.alias_name,
            description: this.description,
            hours: [],
            phone: this.phone,
            country: this.country,
            city: this.city,
            status: EntityStatus.Draft,
            visibility: EntityVisibility.Public,
            createdAt: moment().toDate(),
            updatedAt: moment().toDate(),
        }, false);
    }

    public toEntityHoursModel(entity: DocumentReference<FirebaseFirestore.DocumentData>): EntityHoursModel[] {
        return this.hours.map(hour => {
            const model = new EntityHoursRequest();
            model.day = hour.day;
            model.to = hour.to;
            model.from = hour.from;
            model.close = hour.close;
            model.all_day = hour.all_day;
            return model.toEntityHourModel(entity);
        });
    }
}
