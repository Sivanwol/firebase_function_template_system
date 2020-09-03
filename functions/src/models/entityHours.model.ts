import { BaseModel } from "../common/base.model";
import { DayOfWeek } from "../common/enums";
export interface EntityHoursModel extends BaseModel {
    entity_id: string;
    day: DayOfWeek;
    from: number;
    to: number;
    close: boolean;
    all_day: boolean;
}