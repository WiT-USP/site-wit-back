import { formatDateTime } from "api/utils/format-date-time";
import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Activity } from "./types";

const pool = new GaiaPoolDb();

export class GetActivityByIdController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const activityId = parseInt(request.params?.activityId!);

    try {
      const activity = await getActivityById(client, activityId);

      return {
        statusCode: 200,
        body: activity,
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

async function getActivityById(client: GaiaClientDb, activityId: number) {
  const response = await client.query({
    query: `
      SELECT
        a.name AS "activityName",
        a.start_time AS "startTime",
        a.end_time AS "endTime",
        a.description AS "description",
        a.subject AS "subject",
        a.responsible AS "responsible",
        a.event_id AS "eventId",
        a.registration_at AS "registrationAt"
      FROM "activity" a 
      WHERE a.id = $activityId
    `,
    values: {
      activityId,
    },
  });

  const formattedEvents = response.map((event) => {
    event.startTime = formatDateTime(event.startTime);
    event.endTime = formatDateTime(event.endTime);
    event.registrationAt = formatDateTime(event.registrationAt)
    return event;
  });

  return formattedEvents[0] as Activity;
}
