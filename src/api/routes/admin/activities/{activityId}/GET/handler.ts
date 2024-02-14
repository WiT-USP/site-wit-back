import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetActivityByIdController } from "./controller";

export const handler = adaptExpressProxyEvent(GetActivityByIdController);
