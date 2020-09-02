import { BaseModel } from "../common/base.model";
import { DayOfWeek } from "../common/enums";
export interface EntityHoursModel extends BaseModel {
    day: DayOfWeek;
    from: number;
    to: number;
    all_day: boolean;
}