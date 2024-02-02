import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { CreateSubscribeEventController } from "./controller";

export const handler = adaptExpressProxyEvent(CreateSubscribeEventController);
