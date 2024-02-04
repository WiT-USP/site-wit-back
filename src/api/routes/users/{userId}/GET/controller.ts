import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";

export class GetUserController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const userId = request?.params?.userId!;

    try {
      const hello = `Hello GET user/${userId}`;
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
