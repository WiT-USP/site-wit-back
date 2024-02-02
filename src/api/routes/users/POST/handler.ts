import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { CreateUserController } from "./controller";

export const handler = adaptExpressProxyEvent(CreateUserController);
