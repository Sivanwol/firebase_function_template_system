import { Authorized, JsonController, Post } from 'routing-controllers';

@JsonController("/auth")
export class AuthController {
    @Authorized()
    @Post("/sync/user")
    async syncUser(): Promise<void> {

    }
    
}
