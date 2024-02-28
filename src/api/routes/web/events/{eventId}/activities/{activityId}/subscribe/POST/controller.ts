import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class createSubscriveInActivityController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const activityId = parseInt(request.params?.activityId!);
    const body = request.body;

    const client = await pool.connect();

    try {
      await client.transaction.start();

      const userId = await createUser(client, {
        name: body.name,
        email: body.email,
      });

      await createSubscribe(client, { userId, activityId });

      await client.transaction.end();
      return {
        statusCode: 200,
        body: { success: true },
      };
    } catch (err) {
      console.error(err);
      await client.transaction.rollback();

      return {
        statusCode: 500,
      };
    } finally {
      client.release();
    }
  }
}

interface CreateUserParams {
  name: string;
  email: string;
}

async function createUser(client: GaiaClientDb, params: CreateUserParams) {
  const response = await client.query({
    query: `
      INSERT INTO "user" (name, email, permission_id)
      VALUES ($name, $email, 2)
      RETURNING id AS "userId"
    `,
    values: {
      name: params.name,
      email: params.email,
    },
  });

  return response[0].userId as number;
}

interface CreateSubscribeParams {
  userId: number;
  activityId: number;
}

async function createSubscribe(
  client: GaiaClientDb,
  params: CreateSubscribeParams
) {
  await client.query({
    query: `
      INSERT INTO user_activity  (user_id, activity_id)
      VALUES ($userId, $activityId) 
    `,
    values: {
      userId: params.userId,
      activityId: params.activityId,
    },
  });
}
