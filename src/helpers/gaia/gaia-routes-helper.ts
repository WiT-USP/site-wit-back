import express from "express";
import { GaiaRoutes } from "../../../gaia/index";

export class GaiaRouterHelper {
  private port: number;
  private host: string;

  constructor() {
    this.port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 0;
    this.host = process.env.API_HOST || "";
  }

  async callRoutes() {
    const app = express();

    const base = "src/api/routes";

    const gaiaRoute = new GaiaRoutes(app, base);

    await gaiaRoute.createAllRoutes();

    app.listen(this.port, this.host, () => {
      console.log(`\nServidor rodando em http://${this.host}:${this.port}`); // alterar aqui para arquivo .env
    });
  }
}

async function aux() {
  const app = express();

  const base = "src/api/routes";

  const gaiaRoute = new GaiaRoutes(app, base);

  await gaiaRoute.createAllRoutes();
}
