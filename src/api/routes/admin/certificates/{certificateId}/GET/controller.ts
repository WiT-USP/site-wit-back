import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Certificate } from "./types";

const pool = new GaiaPoolDb();

export class GetCertificateByIdController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const certificateId = parseInt(request.params?.certificateId!);

    try {
      const certificate = await getCertificateById(client, certificateId);

      return {
        statusCode: 200,
        body: certificate,
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

async function getCertificateById(client: GaiaClientDb, certificateId: number) {
  const response = await client.query({
    query: `
      SELECT 
        c.id AS "certificateId",
        a.name AS "certificateName",
        c.workload AS "workload",
        CASE WHEN template IS NOT NULL AND template <> '' 
            THEN true 
            ELSE false 
            END AS "hasTemplate"
      FROM certificate c
      INNER JOIN activity a ON a.id = c.activity_id
      WHERE c.id = $certificateId
    `,
    values: {
      certificateId,
    },
  });

  return response[0] as Certificate;
}
