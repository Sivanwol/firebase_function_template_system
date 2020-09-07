import { SortDirection } from "../../common/enums";
import { IsPositive, IsEnum, IsOptional, IsNumber, IsString } from "class-validator";
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
    @IsEnum(SortDirection)
    public sortDirection: SortDirection = SortDirection.DESC;
}
