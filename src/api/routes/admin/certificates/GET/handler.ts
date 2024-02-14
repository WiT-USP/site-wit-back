import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetCertificatesController } from "./controller";

export const handler = adaptExpressProxyEvent(GetCertificatesController);
