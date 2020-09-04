import { IsBoolean } from "class-validator";

export class OperationResponse {
    @IsBoolean()
    public operation_status: boolean;
}
