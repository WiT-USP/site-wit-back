import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { CreateCertificateController } from "./controller";

export const handler = adaptExpressProxyEvent(CreateCertificateController);
