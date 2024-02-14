import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { EventDropdown } from "./types";

const pool = new GaiaPoolDb();

export class GetDropdownEventsController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    try {
      const eventsDropdown = await getDropdownEvents(client);

      return {
        statusCode: 200,
        body: eventsDropdown,
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

async function getDropdownEvents(client: GaiaClientDb) {
  const response = await client.query({
    query: `
      SELECT  
        id AS "eventId",
        name AS "eventName"
      FROM "event"
    `,
    values: {},
  });

  return response as EventDropdown[];
}
