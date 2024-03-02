import { ParamsDictionary } from "express-serve-static-core";
import { IncomingHttpHeaders } from "http";
import { ParsedQs } from "qs";

export type HttpRequest<T = any> = {
  headers: IncomingHttpHeaders;
  params?: ParamsDictionary;
  query?: ParsedQs;
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
