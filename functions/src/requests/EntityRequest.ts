import { DayOfWeek, EntityType } from '../common/enums';
import { IsBoolean, IsInt, Min, Max, IsOptional, IsEnum, IsUrl, MaxLength, IsString, ValidateNested, IsPhoneNumber, IsISO31661Alpha2, MinLength } from './node_modules/class-validator';
import { EntitiesModel } from '../models/entities.model';
import { EntityHoursModel } from '../models/entityHours.model';

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
    @IsInt()
    @Min(1)
    @Max(24)
    public from: number;
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(24)
    public to: number;
    @IsOptional()
    @IsBoolean()
    public close: boolean;
    @IsOptional()
    @IsBoolean()
    public all_day: boolean;
    public toEntityHourModel(entity_id: string): EntityHoursModel {
        return {
            entity_id,
            day: this.day,
            from: this.from,
            to: this.to,
            close: this.close,
            all_day: this.all_day,
        }
    }
}
export class EntityRequest {
    @IsEnum(EntityType)
    public type: EntityType;
    @IsString()
    public name: string;
    @IsOptional()
    @IsString()
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
    public socials: EntitySocial;

    public toEntityModel(): EntitiesModel {
        const entity: EntitiesModel = {
            type: this.type,
            name: this.name,
            alias_name: this.alias_name,
            description: this.description,
            intro: {},
            phone: this.phone,
            city: this.city,
            country: this.country,
            socials: {}
        };
        return entity;

    }
    public toEntityHoursModel(entity_id: string): EntityHoursModel[] {
        return this.hours.map(hour => hour.toEntityHourModel(entity_id));
    }
}
