import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";

const pool = new GaiaPoolDb();

export class deleteEventController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const eventId = parseInt(request.params?.eventId!);

    try {
      await deleteEvent(client, eventId);

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

async function deleteEvent(client: GaiaClientDb, eventId: number) {
  await client.query({
    query: `
      UPDATE event
      SET 
        active = FALSE
      WHERE id = $eventId;
    `,
    values: {
      eventId,
    },
  });
}
