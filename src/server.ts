import dotenv from "dotenv";
import { GaiaDBHelper, GaiaRouterHelper } from "./helpers/index";

dotenv.config();

const gaia = new GaiaRouterHelper();
const db = new GaiaDBHelper();

// Formato apenas para testes
gaia.callRoutes().then(() => {
  db.connectDB();
});
