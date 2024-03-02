import { NextFunction, Response } from "express";

import { HttpRequest } from "protocols/http";

export function checkRouteAuth(
  req: HttpRequest,
  res: Response,
  next: NextFunction
) {
  const allowedOrigins = [process.env.FRONT_URL]; // Add your frontend URL here
  const origin = req.headers.origin!;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Acesso negado. Origim não alterizada." });
  }
}
