import { SortDirection } from '../../common/enums';
import { IsPositive, IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
export class ListQuery {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    public limit: number = 20;
    @IsOptional()
    @IsNumber()
    @IsPositive()
    public page: number = 1;
    @IsOptional()
    @IsString()
    public sortField: string = 'id';

    @IsOptional()
    @IsEnum(SortDirection)
    public sortDirection: SortDirection = SortDirection.DESC;
}