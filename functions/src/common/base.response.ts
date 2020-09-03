import { IsString, IsBoolean, IsOptional, IsDateString } from "class-validator";

export abstract class BaseResponse<T> {
    @IsBoolean()
    public status: boolean;
    @IsOptional()
    @IsString()
    public error: string;
    public data: T;
    @IsDateString()
    public request_at: string;
}