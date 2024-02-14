import { formatDateTime } from "api/utils/format-date-time";
import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Activity } from "./types";

const pool = new GaiaPoolDb();

export class GetActivitiesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    try {
      const activities = await getActivities(client);

      return {
        statusCode: 200,
        body: activities,
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

async function getActivities(client: GaiaClientDb) {
  const response = await client.query({
    query: `
    SELECT 
      a.id AS "activityId",
      a."name" AS "activityName",
      a."start_time" AS "date",
      e."name" AS "eventName",
      a.certificated AS "certificated"
    FROM "activity" a
    INNER JOIN "event" e ON e.id = a.event_id
  
    `,
    values: {},
  });

  const formattedEvents = response.map((event) => {
    event.startDate = formatDateTime(event.startDate);

    return event;
  });

  return formattedEvents as Activity[];
}
