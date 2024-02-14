import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { CreatCertificateController } from "./controller";

export const handler = adaptExpressProxyEvent(CreatCertificateController);
