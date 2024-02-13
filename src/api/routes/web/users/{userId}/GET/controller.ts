import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";

const pool = new GaiaPoolDb();

export class GetUserController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const userId = parseInt(request?.params?.userId!);

    const client = await pool.connect();

    try {
      const user = await getUserById(client, userId);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (err) {
      console.error(err);

      return {
        statusCode: 500,
      };
    } finally {
      client.release();
    }
  }
}

interface User {
  name: string;
  email: string;
}

async function getUserById(client: GaiaClientDb, userId: number) {
  const response = await client.query({
    query: `
      SELECT 
        name, 
        email   
      FROM "user" 
    `,
    values: {
      userId: userId,
    },
  });

  return response as User[];
}
