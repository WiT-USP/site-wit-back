import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { GetCertificateByIdController } from "./controller";

export const handler = adaptExpressProxyEvent(GetCertificateByIdController);
