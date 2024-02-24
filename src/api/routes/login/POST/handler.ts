import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { CreatEventController } from "./controller";

export const handler = adaptExpressProxyEvent(CreatEventController);
