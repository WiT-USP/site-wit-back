import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { ActivityDropdown } from "./types";

const pool = new GaiaPoolDb();

export class GetDropdownActivitiesController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    try {
      const activitiesDropdown = await getDropdownActivities(client);

      return {
        statusCode: 200,
        body: activitiesDropdown,
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

async function getDropdownActivities(client: GaiaClientDb) {
  const response = await client.query({
    query: `
      SELECT  
        id AS "activityId",
        name AS "activityName"
      FROM "activity"
    `,
    values: {},
  });

  return response as ActivityDropdown[];
}
