import { NextFunction, Request, Response } from "express";

export function checkRouteAuth(
  req: Request,
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
      .json({ message: "Access denied. Not allowed origin." });
  }
}
