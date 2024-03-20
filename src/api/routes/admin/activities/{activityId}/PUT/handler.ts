import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { UpdateActivityByIdController } from "./controller";

export const handler = adaptExpressProxyEvent(UpdateActivityByIdController);
