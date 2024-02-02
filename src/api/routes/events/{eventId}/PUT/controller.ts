import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";

export class UpdateEventController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    try {
      const hello = "Hello PUT event/{eventId}";
      console.log(hello);

      return {
        statusCode: 200,
        body: hello,
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
      };
    }
  }
}
