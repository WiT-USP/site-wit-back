import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class CreatEventController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const body = request.body;

    // [VER DEPOIS]
    // [1] Criar validações
    try {
      await createActivity(client, {
        activityName: body.activityName,
        startTime: body.startTime,
        endTime: body?.endTime,
        description: body?.description,
        subject: body.subject,
        responsible: body.responsible,
        eventId: body.eventId,
        registrationAt: body.registrationAt,
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

interface CreateActivityParams {
  activityName: string;
  startTime: string;
  endTime: string;
  description?: string;
  subject: string;
  responsible: string;
  eventId: number;
  registrationAt: string;
}

async function createActivity(
  client: GaiaClientDb,
  params: CreateActivityParams
) {
  await client.query({
    query: `
    INSERT INTO "activity" (name, start_time, end_time, description, subject, responsible, event_id, registration_at)
    VALUES ($activityName, $startTime, $endTime, $description, $subject, $responsible, $eventId, $registrationAt)
    `,
    values: {
      activityName: params.activityName,
      startTime: params.startTime,
      endTime: params.endTime,
      description: params.description || null,
      subject: params.subject,
      responsible: params.responsible,
      eventId: params.eventId,
      registrationAt: params.registrationAt,
    },
  });
}
