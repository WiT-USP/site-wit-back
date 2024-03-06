import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body, Certificate, Query } from "./types";

const pool = new GaiaPoolDb();

export class GetCertificatesController implements Controller {
  async handle(request: HttpRequest<Body, Query>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const searchParam = request.query?.searchParam;

    const client = await pool.connect();

    try {
      const certificates = await getCertificates(client, searchParam);

      return {
        statusCode: 200,
        body: certificates,
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

async function getCertificates(
  client: GaiaClientDb,
  searchParam: string | undefined
) {
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
      WHERE c.active = true
      ${searchParam !== "null" ? `AND a."name" ILIKE '%${searchParam}%'` : ""}
      ORDER BY c.id
    `,
    values: {},
  });

  const formattedEvents = response.map((event) => {
    event.certificateName = "Certificado: " + event.certificateName;

    return event;
  });

  return formattedEvents as Certificate[];
}
