import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { UpdateUserController } from "./controller";

export const handler = adaptExpressProxyEvent(UpdateUserController);
