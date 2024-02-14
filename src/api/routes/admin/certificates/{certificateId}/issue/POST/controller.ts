import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class CreateCertificatedActivityUserController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const body = request.body;

    // [VER DEPOIS]
    // [1] Criar validações
    // [2] Ver sobre criar arquivo
    // [3] Criar query para esse caso que é um vetor
    try {
      await createCertificatedActivityUser(client, body.userActivityIds);

      return {
        statusCode: 200,
        body: { success: true },
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

async function createCertificatedActivityUser(
  client: GaiaClientDb,
  userActivityIds: number[]
) {
  await client.query({
    query: `
    `,
    values: {
      userActivityIds,
    },
  });
}
