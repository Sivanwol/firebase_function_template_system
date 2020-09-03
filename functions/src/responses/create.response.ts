import { BaseResponse } from "../common/base.response";
import { IsString } from "class-validator";
class DataCreateResponse {
    @IsString()
    public insert_id: string;
}
export class CreateResponse extends BaseResponse<DataCreateResponse> { }
