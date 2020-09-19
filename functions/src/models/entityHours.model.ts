import { IsString, IsEnum, IsOptional, IsBoolean } from "class-validator";
import { BaseModel } from "../common/base.model";
import { DayOfWeek } from "../common/enums";

export interface IEntityHoursModel extends BaseModel {
    entity_id: string;
    day: DayOfWeek;
    from: string;
    to: string;
    close: boolean;
    all_day: boolean;
}
export class EntityHoursModel extends BaseModel {
    @IsString()
    public entity_id: string;
    @IsEnum(DayOfWeek)
    public day: DayOfWeek;
    @IsOptional()
    @IsString()
    public from: string;
    @IsOptional()
    @IsString()
    public to: string;
    @IsOptional()
    @IsBoolean()
    public close: boolean;
    @IsOptional()
    @IsBoolean()
    public all_day: boolean;

    constructor(params: IEntityHoursModel, validate: boolean = true) {
        super(params);
        this.all_day = params.all_day;
        this.day = params.day;
        this.entity_id = params.entity_id;
        this.from = params.from;
        this.to = params.to;
        this.close = params.close;

        if (validate) {
            this.validate();
        }
    }
}
