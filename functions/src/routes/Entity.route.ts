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
        logger.info("request @GET(/entity) EntityController:listEntities", query);
        const response = new BaseResponse<ListResponse<EntityResponse>>();
        response.Data = new ListResponse<EntityResponse>();
        try {
            response.Data = await EntityService.listEntities(query.limit, query.offset_id, query.sortField, query.sortDirection);
            response.Status = true;
        } catch (err) {
            logger.error("@GET(/entity) EntityController:listEntities has an error", err);
            response.Status = false;
            response.Errors = err.message;
        }
        return response;
    }
    @Get("/:entity_id")
    public async getEntity(@Param("entity_id") entity_id: string): Promise<BaseResponse<EntityResponse> {
        logger.info("request @GET(/entity/:entity_id) EntityController:getEntity", entity_id);
        const response = new BaseResponse<EntityResponse>();
        try {
            response.Data = await EntityService.getEntity(entity_id);
            response.Status = true;
        } catch (err) {
            logger.error("@GET(/entity/:entity_id) EntityController:getEntity has an error", err);
            response.Status = false;
            response.Errors = err.message;
        }
        return response;
    }
    @Put("/clear-hours/:entity_id")
    public async clearOpeningsHours(@Param("entity_id") entity_id: string): Promise<BaseResponse<OperationResponse> {
        logger.info(`request @PUT(/entity/clear-hours/${entity_id}) EntityController:clearOpeningsHours`);
        const response: BaseResponse<OperationResponse> = new BaseResponse<OperationResponse>();
        response.Data = new OperationResponse();
        try {
            response.Data.operation_status = await EntityService.cleanOpeningHours(entity_id);
            response.Status = true;
        } catch (err) {
            logger.error(`request @PUT(/entity/clear-hours/${entity_id}) EntityController:clearOpeningsHours has an error`, err);
            response.Status = false;
            response.Errors = err.message;
        }
        return response;
    }

    @Post("/")
    public async createEntity(@Body() entityBody: EntityRequest): Promise<BaseResponse<CreateResponse>> {
        logger.info("request @POST(/entity) EntityController:createEntity", entityBody);
        const response: BaseResponse<CreateResponse> = new BaseResponse<CreateResponse>();
        response.Data = new CreateResponse();
        try {
            response.Data.insert_id = await EntityService.createEntity(entityBody);
            response.Status = true;
        } catch (err) {
            logger.error("@POST(/entity) EntityController:createEntity has an error", err);
            response.Status = false;
            response.Errors = err.message;
        }
        return response;
    }
    @Put("/:entity_id")
    public async updateEntity(@Param("entity_id") entity_id: string, @Body() entityBody: EntityRequest): Promise<BaseResponse<OperationResponse>> {
        logger.info(`request @Put(/entity/${entity_id}) EntityController:updateEntity`, entityBody);
        const response: BaseResponse<OperationResponse> = new BaseResponse<OperationResponse>();
        response.Data = new OperationResponse();
        try {
            response.Data.operation_status = await EntityService.updateEntity(entity_id, entityBody);
            response.Status = true;
        } catch (err) {
            logger.error(`request @Put(/entity/${entity_id}) EntityController:updateEntity has an error`, err);
            response.Status = false;
            response.Errors = err.message;
        }
        return response;
    }
    @Delete("/:entity_id")
    public async deleteEntity(@Param("entity_id") entity_id: string): Promise<BaseResponse<OperationResponse>> {
        logger.info(`request @Delete(/entity/${entity_id}) EntityController:deleteEntity`);
        const response: BaseResponse<OperationResponse> = new BaseResponse<OperationResponse>();
        response.Data = new OperationResponse();
        try {
            response.Data.operation_status = await EntityService.deleteEntity(entity_id);
            response.Status = true;
        } catch (err) {
            logger.error(`request @Put(/entity/${entity_id}) EntityController:updateEntity has an error`, err);
            response.Status = false;
            response.Errors = err.message;
        }
        return response;
    }
}
