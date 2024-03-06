import { ParamsDictionary } from "express-serve-static-core";
import { IncomingHttpHeaders } from "http";

export type HttpRequest<T = any, Q = any> = {
  headers: IncomingHttpHeaders;
  params?: ParamsDictionary;
  query?: Q;
  locals?: Record<string, string>;
  body: T;
  file?: Express.Multer.File;
  user?: any;
};

export type HttpResponse<T = any> = {
  statusCode: number;
  body?: T;
  headers?: Record<string, string>;
};
