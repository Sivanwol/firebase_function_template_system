import { EntityRequest } from "../requests/EntityRequest";
import { JsonController, Post, Body, Get, Put, Param, Delete, QueryParams } from "routing-controllers";
import { CreateResponse } from "../responses/create.response";
import EntityService from "../services/entity.service";
import { logger } from "firebase-functions";
import { BaseResponse, ListResponse } from "../common/base.response";
import { OperationResponse } from "../responses/operation.response";
import { ListQuery } from "../requests/queries/list.query";
import { EntityResponse } from "../responses/entity.response";
@JsonController("/entity")
export class EntityController {
    @Get("/")
    public async listEntities(@QueryParams() query: ListQuery): Promise<BaseResponse<ListResponse<EntityResponse>>> {
        return null;
    }
    @Post("/")
    public async createEntity(@Body() entityBody: EntityRequest): Promise<BaseResponse<CreateResponse>> {
        logger.info("request @POST(/entity) EntityController:createEntity" , entityBody);
        const response: BaseResponse<CreateResponse> = new BaseResponse<CreateResponse>();
        response.Data = new CreateResponse();
        try {
            response.Data.insert_id = await EntityService.createEntity(entityBody);
            response.Status = true;
        } catch (err) {
            logger.error("@POST(/entity) EntityController:createEntity has an error", err);
            response.Status = false;
            response.Errors = "Server Error please contact admin";
        }
        return response;
    }
    @Put("/:entity_id")
    public async updateEntity(@Param("entity_id") entity_id: string,@Body() entityBody: EntityRequest): Promise<BaseResponse<OperationResponse>> {
        logger.info(`request @Put(/entity/${entity_id}) EntityController:updateEntity` , entityBody);
        const response: BaseResponse<OperationResponse> = new BaseResponse<OperationResponse>();
        response.Data = new OperationResponse();
        try {
            response.Data.operation_status = await EntityService.updateEntity(entity_id, entityBody);
            response.Status = true;
        } catch (err) {
            logger.error(`request @Put(/entity/${entity_id}) EntityController:updateEntity has an error`, err);
            response.Status = false;
            response.Errors = "Server Error please contact admin";
        }
        return response;
    }
    @Delete("/:entity_id")
    async deleteEntity(@Param("entity_id") entity_id: string): Promise<BaseResponse<OperationResponse>> {
        logger.info(`request @Delete(/entity/${entity_id}) EntityController:deleteEntity`);
        const response: BaseResponse<OperationResponse> = new BaseResponse<OperationResponse>();
        response.Data = new OperationResponse();
        try {
            response.Data.operation_status = await EntityService.deleteEntity(entity_id);
            response.Status = true;
        } catch (err) {
            logger.error(`request @Put(/entity/${entity_id}) EntityController:updateEntity has an error`, err);
            response.Status = false;
            response.Errors = "Server Error please contact admin";
        }
        return response;
    }
}
