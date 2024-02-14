import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";

const pool = new GaiaPoolDb();

export class deleteCertificateController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const certificateId = parseInt(request.params?.certificateId!);

    try {
      await deleteCertificate(client, certificateId);

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

async function deleteCertificate(client: GaiaClientDb, certificateId: number) {
  await client.query({
    query: `
      UPDATE certificate
      SET 
        active = FALSE
      WHERE id = $certificateId;
    `,
    values: {
      certificateId,
    },
  });
}
