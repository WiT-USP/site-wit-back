import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Controller } from "protocols/controller";

declare module "express" {
  interface Request {
    user?: any;
  }
}

export function adaptExpressProxyEvent(ControllerClass: new () => Controller) {
  const controller = new ControllerClass();

  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("[adaptExpressProxyEvent] Starting execution:", req.body);

    try {
      if (isProtectedRoute(req.path)) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
          return res
            .status(401)
            .json({ error: "Token de autenticação não fornecido." });
        }
        try {
          const decoded = await verifyTokenAsync(token);
          req.user = decoded;
        } catch (err) {
          console.error(err);
          return res.status(403).json({ error: "Token inválido" });
        }
      }

      const httpResponse = await controller.handle({
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body,
      });

      console.log(
        "[adaptExpressProxyEvent] Controller response:",
        JSON.stringify(httpResponse)
      );

      res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      console.error("[adaptExpressProxyEvent] Error during execution:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

function isProtectedRoute(path: string): boolean {
  return path.startsWith("/admin");
}

// Função para verificar o token JWT de forma assíncrona
function verifyTokenAsync(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_TOKEN_KEY!, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
