import { adaptExpressProxyEvent } from "adapters/express-proxy-handler";
import { UpdateEventByIdController } from "./controller";

export const handler = adaptExpressProxyEvent(UpdateEventByIdController);
