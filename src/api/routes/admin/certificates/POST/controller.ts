import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class CreateCertificateController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const body = request.body;

    // [VER DEPOIS]
    // [1] Adicionar tratativa de aramazenamento de imagens no bucket.
    // [2] Criar validações
    try {
      client.transaction.start();

      await createCertificate(client, {
        workload: body.workload,
        activityId: body.activityId,
        template: body.template,
        description: body?.description,
      });

      await relateActivityCertificate(client, body.activityId);

      client.transaction.end();

      return {
        statusCode: 200,
        body: { success: true },
      };
    } catch (err) {
      client.transaction.rollback();
      console.error(err);

      return {
        statusCode: 500,
      };
    } finally {
      client.release();
    }
  }
}

interface CreateCertificateParams {
  workload: number;
  activityId: number;
  description?: string;
  template?: string;
}

async function createCertificate(
  client: GaiaClientDb,
  params: CreateCertificateParams
) {
  await client.query({
    query: `
      INSERT INTO "event" (workload, activity_id, description, template)
      VALUES ($workload, $activityId, $description, $template)
    `,
    values: {
      workload: params.workload,
      activityId: params.activityId,
      description: params.description || null,
      template: params.template || null,
    },
  });
}

async function relateActivityCertificate(
  client: GaiaClientDb,
  activityId: number
) {
  await client.query({
    query: `
    UPDATE activity
    SET 
      certificated = TRUE
    WHERE id = $activityId;
    `,
    values: {
      activityId,
    },
  });
}
