import { PingController } from "./Ping.route";
import { TestController } from "./Test.route";
import { EntityController } from "./Entity.route";

export const apiRoutes = [
    PingController,
    TestController,
    EntityController,
]