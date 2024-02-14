import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetEventByIdController } from "./controller";

export const handler = adaptExpressProxyEvent(GetEventByIdController);
