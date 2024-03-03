import dotenv from "dotenv";
import { GaiaRouterHelper } from "./helpers/index";

dotenv.config();

const gaia = new GaiaRouterHelper();
gaia.callRoutes();
