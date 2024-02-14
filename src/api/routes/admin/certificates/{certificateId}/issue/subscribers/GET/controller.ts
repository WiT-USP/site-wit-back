import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { ActivitySubscribers } from "./types";

const pool = new GaiaPoolDb();

export class GetSubscribersInActivityController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const certificateId = parseInt(request.params?.certificateId!);

    try {
      const subscribers = await getSubscribersInActivity(client, certificateId);

      return {
        statusCode: 200,
        body: subscribers,
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

async function getSubscribersInActivity(
  client: GaiaClientDb,
  certificateId: number
) {
  const response = await client.query({
    query: `
    SELECT 
      u.id AS "userId",
      ua.id AS "userActivityId",
      u."name" AS "name",
      u.email AS "email"
    FROM certificate c
    INNER JOIN user_activity ua ON ua.activity_id = c.activity_id
    INNER JOIN "user" u ON u.id = ua.user_id
    WHERE c.id = $certificateId
    `,
    values: {
      certificateId,
    },
  });

  return response as ActivitySubscribers[];
}
