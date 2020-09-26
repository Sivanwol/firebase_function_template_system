import { IsString, IsBoolean, IsOptional, IsDateString, IsObject } from "class-validator";
import moment from "moment";
import { SortDirection } from "./enums";

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

export class ListResponse<T> {
    public meta: {
        total_entities: number,
        last_offset_id: string,
        sort_field: string,
        sort_dir: SortDirection
    };
    public items: T[] = [];

}