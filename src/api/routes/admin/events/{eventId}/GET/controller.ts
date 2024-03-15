import { formatDateTime } from "api/utils/format-date-time";
import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Event } from "./types";

const pool = new GaiaPoolDb();

export class GetEventByIdController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const eventId = parseInt(request.params?.eventId!);

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
        id AS "eventId",
        local AS "local",
        name AS "eventName",
        description AS "description",
        CASE WHEN cover IS NOT NULL AND cover <> '' 
          THEN true 
          ELSE false 
          END AS "hasCover",
        gallery_url AS "driveGalleryLink",
        coffee_payment_url AS "coffeePaymentUrl",
        coffee_value AS "coffeeValue",
        start_date AS "startDate",
        end_date AS "endDate"
      FROM "event"
      WHERE id = $eventId
    `,
    values: {
      eventId,
    },
  });

  const formattedEvents = response.map((event) => {
    event.startDate = formatDateTime(event.startDate);
    event.endDate = formatDateTime(event.endDate);
    return event;
  });

  return formattedEvents[0] as Event;
}
