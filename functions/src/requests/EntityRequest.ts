import { DayOfWeek, EntityType } from '../common/enums';
import { IsBoolean, IsInt, IsOptional, IsEnum, IsUrl, MaxLength, IsString, ValidateNested, IsPhoneNumber, IsISO31661Alpha2, MinLength, Length, Matches } from 'class-validator';
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
    @IsString()
    @Length(5, 5)
    @Matches('/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/')
    public from: string;
    @IsOptional()
    @IsString()
    @Length(5, 5)
    @Matches('/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/')
    public to: string;
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
            from: this.from || '',
            to: this.to || '',
            close: this.close || false,
            all_day: this.all_day || false,
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
    public socials?: EntitySocial;

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
        return this.hours.map(hour => {
            const model = new EntityHoursRequest();
            model.day = hour.day;
            model.to = hour.to;
            model.from = hour.from;
            model.close = hour.close;
            model.all_day = hour.all_day;
            return model.toEntityHourModel(entity_id)
        });
    }
}
