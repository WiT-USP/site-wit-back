import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { deleteCertificateController } from "./controller";

export const handler = adaptExpressProxyEvent(deleteCertificateController);
