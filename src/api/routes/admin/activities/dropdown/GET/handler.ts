import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetDropdownEventsController } from "./controller";

export const handler = adaptExpressProxyEvent(GetDropdownEventsController);
