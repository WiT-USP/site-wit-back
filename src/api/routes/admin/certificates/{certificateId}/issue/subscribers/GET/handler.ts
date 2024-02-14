import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetSubscribersInActivityController } from "./controller";

export const handler = adaptExpressProxyEvent(
  GetSubscribersInActivityController
);
