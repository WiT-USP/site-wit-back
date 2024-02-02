import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetUsersController } from "./controller";

export const handler = adaptExpressProxyEvent(GetUsersController);
