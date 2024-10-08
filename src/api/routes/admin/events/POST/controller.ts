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

    try {
      await createEvent(client, {
        eventName: body.eventName,
        startDate: body.startDate,
        endDate: body.endDate,
        description: body?.description,
        coffeValue: body?.coffeValue,
        coffeePaymentLink: body?.coffeePaymentLink,
        driveGalleryLink: body?.driveGaleryLink,
      });

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

interface CreateEventParams {
  eventName: string;
  startDate: string;
  endDate: string;
  description?: string;
  coffeValue?: string;
  coffeePaymentLink?: string;
  driveGalleryLink?: string;
}

async function createEvent(client: GaiaClientDb, params: CreateEventParams) {
  await client.query({
    query: `
      INSERT INTO "event" (name, description, gallery_url, coffee_payment_url, coffee_value, start_date, end_date)
      VALUES ($name, $description, $galleryUrl, $coffeePaymentUrl, $coffeeValue, $startDate, $endDate)
    `,
    values: {
      name: params.eventName,
      description: params.description || null,
      galleryUrl: params.driveGalleryLink || null,
      coffeePaymentUrl: params.coffeePaymentLink || null,
      coffeeValue: params.coffeValue || null,
      startDate: params.startDate,
      endDate: params.endDate,
    },
  });
}
