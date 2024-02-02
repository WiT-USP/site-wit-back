import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { DeleteUserController } from "./controller";

export const handler = adaptExpressProxyEvent(DeleteUserController);
