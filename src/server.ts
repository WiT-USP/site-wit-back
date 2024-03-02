import dotenv from "dotenv";
import { GaiaPoolDb, GaiaRouterHelper } from "./helpers/index";

dotenv.config();

const gaia = new GaiaRouterHelper();

gaia.callRoutes();
