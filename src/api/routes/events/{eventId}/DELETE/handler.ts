import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { DeleteEventController } from "./controller";

export const handler = adaptExpressProxyEvent(DeleteEventController);
