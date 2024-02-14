import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetDropdownActivitiesController } from "./controller";

export const handler = adaptExpressProxyEvent(GetDropdownActivitiesController);
