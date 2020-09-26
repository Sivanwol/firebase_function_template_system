import { DocumentReference } from "@google-cloud/firestore";
import { IsString, IsEnum, IsOptional, IsBoolean, IsObject, Length, Matches } from "class-validator";
import { BlankModel, IBlankModel } from "../common/base.model";
import { DayOfWeek } from "../common/enums";

export interface IEntityHoursModel extends IBlankModel {
    day: DayOfWeek;
    from: string;
    to: string;
    close: boolean;
    all_day: boolean;
}
export class EntityHoursModel extends BlankModel {
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

    constructor(params: IEntityHoursModel, validate: boolean = true) {
        super(params);
        this.all_day = params.all_day;
        this.day = params.day;
        this.from = params.from;
        this.to = params.to;
        this.close = params.close;

        if (validate) {
            this.validate();
        }
    }
}
