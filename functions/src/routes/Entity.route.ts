import { EntityRequest } from "../requests/EntityRequest";
import { JsonController, Post, Body } from "routing-controllers";
import { CreateResponse } from "../responses/create.response";
import EntityService from "../services/entity.service";
import { logger } from "firebase-functions";
import { BaseResponse } from "../common/base.response";
@JsonController("/entity")
export class EntityController {
    @Post("/create")
    public async createEntity(@Body() entityBody: EntityRequest): Promise<BaseResponse<CreateResponse>> {
        logger.info("request @POST(/entity/create) EntityController:createEntity" , entityBody);
        const response: BaseResponse<CreateResponse> = new BaseResponse<CreateResponse>();
        try {
            const dta = new CreateResponse();
            dta.insert_id = await EntityService.createEntity(entityBody);
            response.Data = dta;
            response.Status = true;
            throw new Error("EntityController:createEntity")
        } catch (err) {
            logger.error("@POST(/entity/create) EntityController:createEntity has an error", err);
            response.Data = new CreateResponse();
            response.Status = false;
            response.Errors = "Server Error please contact admin";
        }
        return response;
    }
}
