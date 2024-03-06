import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Activity, Body, Query } from "./types";

const pool = new GaiaPoolDb();

export class GetActivitiesController implements Controller {
  async handle(request: HttpRequest<Body, Query>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const searchParam = request.query?.searchParam;

    const client = await pool.connect();

    try {
      const activities = await getActivities(client, searchParam);

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

async function getActivities(
  client: GaiaClientDb,
  searchParam: string | undefined
) {
  const response = await client.query({
    query: `
      SELECT 
        a.id AS "activityId",
        a."name" AS "activityName",
        a."start_time" AS "startDate",
        a."end_time" AS "endDate,",
        e."name" AS "eventName",
        a.certificated AS "certificated"
      FROM "activity" a
      INNER JOIN "event" e ON e.id = a.event_id
      WHERE a.active = true
      ${searchParam !== "null" ? `AND a."name" ILIKE '%${searchParam}%'` : ""}
      ORDER BY a.id
    `,
    values: {},
  });

  return response as Activity[];
}
