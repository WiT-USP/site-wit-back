import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body, User } from "./types";

const pool = new GaiaPoolDb();

export class CreatEventController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const body = request.body;

    try {
      let user: User | undefined

      try{
        user = await getUserByEmail(
          client,
          body.email
        );
      } catch (err) {
        throw new Error("Incorrect password");
      }
      
      if(user) {
        const passwordVerficated = await bcrypt.compare(
          body.password,
          user.passwordHash
        );
        if (!passwordVerficated) throw new Error("Incorrect password");

        const token = jwt.sign(
          { 
            userName: user.userName, 
            userId: user.userId 
          }, 
          process.env.JWT_TOKEN_KEY!
        )
        return {
          statusCode: 200,
          body: { token },
        };
      } else {
        throw new Error("Incorrect password ");
        
      }
    } catch (err: any) {
      console.error(err);

      if (err.message == "Incorrect password") {
        return {
          statusCode: 400,
          body: {
            error: {
              title: "Falha no login",
              message: "E-mail e/ou Senha informados estão incorretos!",
              code: 400,
            },
          },
        };
      }
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
        id AS "userId",
        name AS "userName",
        password_hash  AS "passwordHash"
      FROM "user"
      WHERE email = $email AND password_hash IS NOT NULL AND active = TRUE 
    `,
    values: {
      email,
    },
  });

  return response[0] as User | undefined;
}
