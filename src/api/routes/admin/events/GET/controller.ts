import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Event, Query } from "./types";

const pool = new GaiaPoolDb();

export class GetEventsController implements Controller {
  async handle(request: HttpRequest<Body, Query>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const searchParam = request.query?.searchParam;

    const client = await pool.connect();

    try {
      const events = await getEvents(client, searchParam);

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

async function getEvents(
  client: GaiaClientDb,
  searchParam: string | undefined
) {
  const response = await client.query({
    query: `
      SELECT 
        id AS "eventId",
        "name" AS "eventName",
        "start_date" AS "startDate",
        "end_date" AS "endDate",
        CASE WHEN cover IS NOT NULL AND cover <> '' 
          THEN true 
          ELSE false 
          END AS "hasCover",
        CASE WHEN coffee_payment_url IS NOT NULL AND coffee_payment_url <> '' 
          THEN true 
          ELSE false 
          END AS "hasCoffee"
      FROM "event"
      WHERE active = TRUE
      ${searchParam !== "null" ? `AND "name" ILIKE '%${searchParam}%'` : ""}
      ORDER BY id
    `,
    values: {},
  });

  return response as Event[];
}
