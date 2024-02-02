import { Express } from "express";

import { GaiaRoutesRequest } from "./types";

export async function setupRoutes(routes: GaiaRoutesRequest[], app: Express) {
  console.log("\n[setupRoutes] Starting routes creation ");

  try {
    for (const route of routes) {
      if (route.dirRoute) {
        const handler = await importHandler(route.dirRoute);

        console.log(
          `Rota ${route.pathRoute} ${route.methodRoute} importada:`,
          handler
        );
        await verifyAndCreateMethod(app, { route, handler });
      }
    }

    console.log("[setupRoutes] Ending routes creation ");
  } catch (err) {
    console.error("[setupRoutes] Error creating routes ", err);
  }
}

async function importHandler(dirRoute: string) {
  const module = await import(dirRoute);
  return module["handler"];
}

interface verifyAndCreateMethodParams {
  route: GaiaRoutesRequest;
  handler: any;
}

async function verifyAndCreateMethod(
  app: Express,
  params: verifyAndCreateMethodParams
) {
  switch (params.route.methodRoute) {
    case "GET":
      app.get(`/${params.route.pathRoute}`, params.handler);
      break;

    case "POST":
      app.post(`/${params.route.pathRoute}`, params.handler);
      break;

    case "PUT":
      app.put(`/${params.route.pathRoute}`, params.handler);
      break;

    case "DELETE":
      app.delete(`/${params.route.pathRoute}`, params.handler);
      break;
  }
}
