import { IsString, IsBoolean, IsOptional, IsDateString, IsObject } from "class-validator";
import moment = require("moment");

export class BaseResponse<T> {
    @IsBoolean()
    private status: boolean;
    get Status(): boolean { return this.status; }
    set Status(value: boolean) { this.status = value; }
    @IsOptional()
    @IsString()
    private error: string;
    get Errors(): string { return this.error; }
    set Errors(value: string) { this.error = value; }
    @IsOptional()
    @IsObject()
    private data: T;
    get Data(): T { return this.data; }
    set Data(value: T) { this.data = value; }
    @IsDateString()
    private request_at: string = moment().format('YYYY-MM-DD HH:mm:ss');
    get RequestAt(): string { return this.request_at; }
}