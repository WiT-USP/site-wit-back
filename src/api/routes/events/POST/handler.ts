import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { CreateEventController } from "./controller";

export const handler = adaptExpressProxyEvent(CreateEventController);
