import { Express } from "express";

import { formatPathRoutes } from "./format-path-routes";
import { searchRoutes } from "./search-routes";
import { setupRoutes } from "./setup-routes";
import { GaiaRoutesRequest } from "./types";

export class GaiaRoutes {
  private base: string;
  private routes: GaiaRoutesRequest[];
  private app: Express;

  constructor(app: Express, base: string) {
    this.base = base; // Tornar dinâmico
    this.routes = [];
    this.app = app;
  }

  async createAllRoutes() {
    try {
      const gaiaRoutes = searchRoutes(this.base, this.routes);
      const formatedRoutes = formatPathRoutes(gaiaRoutes);

      await setupRoutes(formatedRoutes, this.app);
    } catch (err) {
      console.log(err);
    }
  }
}
