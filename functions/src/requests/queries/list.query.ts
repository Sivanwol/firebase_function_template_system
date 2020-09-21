import { IsPositive, IsEnum, IsOptional, IsNumber, IsString } from "class-validator";
import { SORT_DIRECTION } from "simple-cached-firestore";
export class ListQuery {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    public limit = 20;
    @IsOptional()
    @IsString()
    public offset_id: string;
    @IsOptional()
    @IsString()
    public sortField = "id";

    @IsOptional()
    @IsEnum(SORT_DIRECTION)
    public sortDirection: SORT_DIRECTION = SORT_DIRECTION.DESC;
}
