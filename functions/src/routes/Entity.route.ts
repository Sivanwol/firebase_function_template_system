import { EntityRequest } from "../requests/EntityRequest";
import { JsonController, Post, Body, Put, Param } from "routing-controllers";
import { CreateResponse } from "../responses/create.response";
import EntityService from "../services/entity.service";
import { logger } from "firebase-functions";
import { BaseResponse } from "../common/base.response";
import { OperationResponse } from "../responses/operation.response";
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
        } catch (err) {
            logger.error("@POST(/entity/create) EntityController:createEntity has an error", err);
            response.Data = new CreateResponse();
            response.Status = false;
            response.Errors = "Server Error please contact admin";
        }
        return response;
    }
    @Put("/update/:entity_id")
    public async updateEntity(@Param("entity_id") entity_id: string,@Body() entityBody: EntityRequest): Promise<BaseResponse<OperationResponse>> {
        logger.info(`request @Put(/entity/update/${entity_id}) EntityController:updateEntity` , entityBody);
        const response: BaseResponse<OperationResponse> = new BaseResponse<OperationResponse>();
        const dta = new OperationResponse();
        response.Data = dta;
        try {
            dta.operation_status = await EntityService.updateEntity(entity_id, entityBody);
            response.Status = true;
        } catch (err) {
            logger.error(`request @Put(/entity/update/${entity_id}) EntityController:updateEntity has an error`, err);
            response.Data.operation_status = false;
            response.Status = false;
            response.Errors = "Server Error please contact admin";
        }
        return response;
    }
}
