import fs from "fs";
import path from "path";

import { GaiaRoutesRequest } from "./types";

export function searchRoutes(
  base: string,
  routes: GaiaRoutesRequest[]
): GaiaRoutesRequest[] {
  var dirs = fs.readdirSync(base);

  const methods = ["GET", "POST", "PUT", "DELETE"];

  for (const index in dirs) {
    var pathDir = path.join(base, dirs[index]);
    var stats = fs.lstatSync(pathDir);

    if (stats) {
      if (stats.isDirectory()) {
        if (methods.includes(dirs[index])) {
          routes.push({ pathRoute: pathDir, methodRoute: dirs[index] });
        }
        searchRoutes(pathDir, routes);
      }
    }
  }

  return routes;
}
