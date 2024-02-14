import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { deleteActivityController } from "./controller";

export const handler = adaptExpressProxyEvent(deleteActivityController);
