import { EntityRequest } from "../requests/EntityRequest";
import { JsonController, Post, Body } from "routing-controllers";
import { CreateResponse } from "../responses/create.response";
import EntityService from "../services/entity.service";
import { error } from "firebase-functions/lib/logger";
@JsonController("/entity")
export class EntityController {
    @Post("/create")
    public async createEntity(@Body() entityBody: EntityRequest): Promise<CreateResponse> {
        const response: CreateResponse = new CreateResponse();
        try {
            response.data.insert_id = await EntityService.createEntity(entityBody);
            response.status = true;
        } catch (err) {
            error("@POST(/entity/create) EntityController:createEntity has an error", err);
            response.status = false;
            response.error = "Server Error please contact admin";
        }
        return response;
    }
}
