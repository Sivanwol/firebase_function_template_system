import { IsString } from "class-validator";

export class DeleteEntitiesRequest {
    @IsString({each: true})
    public entities_ids: string[];
}
