import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Event } from "./types";

const pool = new GaiaPoolDb();

export class GetEventByIdController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const eventId = parseInt(request.params?.eventId!);

    const client = await pool.connect();

    try {
      const event = await getEventById(client, eventId);

      return {
        statusCode: 200,
        body: event,
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

async function getEventById(client: GaiaClientDb, eventId: number) {
  const response = await client.query({
    query: `
      SELECT 
        e.id AS "eventId",
        e."name" AS "eventName",
        e.start_date AS "startDate",
        e.end_date  AS "endDate",
        e.coffee_payment_url AS "coffeePaymentURL",
        e.coffee_value AS "coffeeValue",
        e.gallery_url AS "galleryURL",
        jsonb_agg(
          jsonb_build_object(
            'activityId', a.id,
            'activityName', a."name" 
          ) 
        )  AS "activities"
      FROM "event" e 
      LEFT JOIN activity a ON a.event_id = e.id 
      WHERE e.id = $eventId AND e.active = true
      GROUP BY e.id, e."name", e.start_date, e.end_date, e.coffee_payment_url, e.coffee_value, e.gallery_url
    `,
    values: {
      eventId,
    },
  });

  return response[0] as Event;
}
