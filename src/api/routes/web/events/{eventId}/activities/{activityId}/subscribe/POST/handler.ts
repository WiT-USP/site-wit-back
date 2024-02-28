import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { createSubscriveInActivityController } from "./controller";

export const handler = adaptExpressProxyEvent(
  createSubscriveInActivityController
);
