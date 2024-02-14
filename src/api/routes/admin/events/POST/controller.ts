import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class CreatEventController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const body = request.body;

    // [VER DEPOIS] Adicionar tratativa de aramazenamento de imagens no bucket.
    try {
      const events = await createEvent(client, {
        eventName: body.eventName,
        startDate: body.startDate,
        endDate: body.endDate,
        description: body.description,
        cover: body.cover,
        coffeValue: body.coffeValue,
        coffeePaymentLink: body.coffeePaymentLink,
        driveGaleryLink: body.driveGaleryLink,
      });

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

interface CreateEventParams {
  eventName: string;
  startDate: string;
  endDate: string;
  description?: string;
  cover?: string;
  coffeValue?: string;
  coffeePaymentLink?: string;
  driveGaleryLink?: string;
}

async function createEvent(client: GaiaClientDb, params: CreateEventParams) {
  await client.query({
    query: `
      INSERT INTO "event" (name, description, cover, galery_url, coffee_payment_url, coffee_value, start_date, end_date)
      VALUES ($name, $description, $cover, $galeryUrl, $coffeePaymentUrl, $coffeeValue, $startDate, $endDate)
    `,
    values: {
      name: params.eventName,
      description: params.description || null,
      cover: params.cover || null,
      galeryUrl: params.driveGaleryLink || null,
      coffeePaymentUrl: params.coffeePaymentLink || null,
      coffeeValue: params.coffeValue || null,
      startDate: params.startDate,
      endDate: params.endDate,
    },
  });
}
