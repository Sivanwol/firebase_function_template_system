import { IsString } from "class-validator";
export class CreateResponse {
    @IsString()
    public insert_id: string;
}
