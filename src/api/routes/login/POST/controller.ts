import bcrypt from "bcrypt";

import { authenticateAdminUser } from "auth/admin-auth";
import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class CreatEventController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const token = request?.headers?.authorization?.split(" ")[1];
    const body = request.body;

    try {
      if (!token) throw new Error("Token not provides");

      authenticateAdminUser(token);

      const passwordHash = await getUserByEmail(client, body.email);

      const passwordVerficated = await bcrypt.compare(
        body.password,
        passwordHash
      );

      if (!passwordVerficated) throw new Error("Incorrect password");

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

async function getUserByEmail(client: GaiaClientDb, email: string) {
  const response = await client.query({
    query: `
      SELECT 
          password_hash  AS "passwordHash" 
      FROM "user"
      WHERE email = $email AND password_hash IS NOT NULL AND active = TRUE 
    `,
    values: {
      email,
    },
  });

  return response[0].passwordHash as string;
}
