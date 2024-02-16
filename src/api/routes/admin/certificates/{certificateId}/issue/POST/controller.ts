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

    const certificatedId = parseInt(request.params?.certificatedId!);

    // [VER DEPOIS]
    // [1] Criar validações
    // [2] Ver sobre criar arquivo
    try {
      await createCertificatedActivityUser(client, {
        certificatedId,
        userActivityIds: body.userActivityIds,
      });

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

interface CreateCertificatedActivityUserParams {
  userActivityIds: number[];
  certificatedId: number;
}

async function createCertificatedActivityUser(
  client: GaiaClientDb,
  params: CreateCertificatedActivityUserParams
) {
  const values: any[] = [];
  params.userActivityIds.forEach((userActivityId, index) => {
    const offset = index * 2;
    values.push(userActivityId);
    values.push(params.certificatedId);

    return `(
      $${offset + 1},
      $${offset + 2}
    )`;
  });

  await client.queryWithoutFormatting({
    query: `
      INSERT INTO "user_activity_certificate" (user_activity_id, certificate_id)
      VALUES ${values.join(",")}
      ON CONFLICT (user_activity_id, certificate_id) DO NOTHING;
    `,
    values,
  });
}
