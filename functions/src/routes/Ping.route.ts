import { JsonController, Get, Req, Res } from "routing-controllers";

@JsonController('/ping')
export class PingController {

   @Get("/routes")
   getRoutes() {
      return {
         routes: {
            '/': ['get'],
            '/clients': ['get', 'post'],
            '/client/:id': ['get', 'put', 'delete']
         }
      }
   }

   @Get("/check")
   getCheck(@Req() request: any, @Res() response: any) {
      return {
         message: `You're logged in as ${response.locals.user.email} with Firebase UID: ${response.locals.user.user_id}`
      };
   }
}