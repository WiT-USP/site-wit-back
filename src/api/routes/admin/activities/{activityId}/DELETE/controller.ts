import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";

const pool = new GaiaPoolDb();

export class deleteActivityController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const activityId = parseInt(request.params?.activityId!);

    try {
      await deleteActivity(client, activityId);

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

async function deleteActivity(client: GaiaClientDb, activityId: number) {
  await client.query({
    query: `
    UPDATE activity
    SET 
      active = FALSE
    WHERE id = $activityId;
    `,
    values: {
      activityId,
    },
  });
}
