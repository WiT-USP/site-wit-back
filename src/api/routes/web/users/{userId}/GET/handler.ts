import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetUserController } from "./controller";

export const handler = adaptExpressProxyEvent(GetUserController);
