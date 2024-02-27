import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetEventsController } from "./controller";

export const handler = adaptExpressProxyEvent(GetEventsController);
