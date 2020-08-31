import { JsonController, Get } from "routing-controllers";
import TestService from '../services/test.service'
@JsonController('/test')
export class TestController {

   @Get("/add")
   async addNewTest() {
      console.log("request Test:addNewTest");
      await TestService.addNewTest({
         age: 32,
         fname: "dsaads",
         lname: "dasdsadas"
      })
      return {
         errors: null,
         status: true,
         data: null
      }
   }

   @Get("/all")
   async getAllDocuments() {
      console.log("request Test:getAllDocuments");
      try {
         const docs = await TestService.readAll()
         return {
            errors: null,
            status: true,
            data: docs
         };
      } catch (err) {
         console.error("Error Found on fetching Test:all", err);
         return {
            errors: err.message,
            status: false,
            data: null
         };

      }
   }
}