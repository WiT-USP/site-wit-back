import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetActivitiesController } from "./controller";

export const handler = adaptExpressProxyEvent(GetActivitiesController);
