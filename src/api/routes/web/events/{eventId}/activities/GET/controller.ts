import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Activity } from "./types";

const pool = new GaiaPoolDb();

export class GetActivitiesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const eventId = parseInt(request.params?.eventId!);

    const client = await pool.connect();

    try {
      const events = await getActivitiesEvent(client, eventId);

      return {
        statusCode: 200,
        body: events,
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

async function getActivitiesEvent(client: GaiaClientDb, eventId: number) {
  const response = await client.query({
    query: `
      SELECT
      "name" AS "name",
      subject AS "subject",
      responsible AS "responsible",
      start_time AS "startTime",
      end_time  AS "endTime",
      certificated AS "certicated"
    FROM activity a
    WHERE event_id = $eventId AND active = true
    `,
    values: {
      eventId,
    },
  });

  return response as Activity[];
}
