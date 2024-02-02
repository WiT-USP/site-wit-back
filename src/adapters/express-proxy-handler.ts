import { NextFunction, Request, Response } from "express";
import { Controller } from "protocols/controller";

export function adaptExpressProxyEvent(ControllerClass: new () => Controller) {
  const controller = new ControllerClass();

  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(
      "[adaptExpressProxyEvent] Starting execution:",
      JSON.stringify(req.body)
    );

    try {
      const httpResponse = await controller.handle({
        headers: req.headers, // adicionar tratativa para headers
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
