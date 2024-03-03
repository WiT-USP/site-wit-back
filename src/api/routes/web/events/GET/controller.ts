import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Event } from "./types";

const pool = new GaiaPoolDb();

export class GetEventsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    try {
      const events = await getEvents(client);

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

async function getEvents(client: GaiaClientDb) {
  const response = await client.query({
    query: `
      SELECT 
        e.id AS "eventId",
        e."name" AS "eventName",
        e.start_date AS "startDate",
        e.end_date  AS "endDate",
        COUNT(a.id) AS "activities"
      FROM "event" e 
      LEFT JOIN activity a ON a.event_id = e.id 
      WHERE e.active = true
      GROUP BY e.id, e."name", e.start_date, e.end_date, e.coffee_payment_url, e.coffee_value, e.gallery_url 
    `,
    values: {},
  });

  return response as Event[];
}
