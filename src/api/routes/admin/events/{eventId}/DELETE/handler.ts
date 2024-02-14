import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { deleteEventController } from "./controller";

export const handler = adaptExpressProxyEvent(deleteEventController);
