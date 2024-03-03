import { GaiaRoutesRequest } from "./types";

export function formatPathRoutes(routes: GaiaRoutesRequest[]) {
  console.log("[formatPatchRoutes] input ", JSON.stringify(routes));

  const methods = ["GET", "POST", "PUT", "DELETE"];

  for (const route of routes) {
    route.pathRoute = route.pathRoute.replace(/\\/g, "/"); // Arrumando "\\" para "/""

    route["dirRoute"] = "../../../src/" + route.pathRoute + "/handler.ts"; // Criando caminho para imports
    route.dirRoute = route.dirRoute.replace("src/", "");

    route.pathRoute = route.pathRoute.replace("src/api/routes/", ""); // retiranod inicio de path

    for (const method of methods) {
      route.pathRoute = route.pathRoute.replace(`/${method}`, ""); // retirando o método do path
    }

    route.pathRoute = route.pathRoute.replace(/{/g, ":"); // formatando chaves de rotas (Ids)
    route.pathRoute = route.pathRoute.replace(/}/g, "");
  }

  console.log("\n[formatPatchRoutes] output ", JSON.stringify(routes), "\n");

  return routes;
}
