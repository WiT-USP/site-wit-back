import dotenv from "dotenv";
import { GaiaPoolDb, GaiaRouterHelper } from "./helpers/index";

dotenv.config();

const gaia = new GaiaRouterHelper();
const db = new GaiaPoolDb();

// Formato apenas para testes
gaia.callRoutes().then(() => {
  db.connect();
});
