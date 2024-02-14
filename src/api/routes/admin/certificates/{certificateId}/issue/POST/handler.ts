import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { CreateCertificatedActivityUserController } from "./controller";

export const handler = adaptExpressProxyEvent(
  CreateCertificatedActivityUserController
);
