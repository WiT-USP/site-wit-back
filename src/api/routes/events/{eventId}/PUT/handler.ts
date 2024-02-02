import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { UpdateEventController } from "./controller";

export const handler = adaptExpressProxyEvent(UpdateEventController);
