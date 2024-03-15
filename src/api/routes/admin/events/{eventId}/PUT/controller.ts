import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class UpdateEventByIdController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const eventId = parseInt(request.params?.eventId!);
    const body = request.body

    try {
      await updateEventById(client, {
        eventId,
        eventName: body?.eventName,
        local: body?.local,
        description: body?.description,
        driveGalleryLink: body?.driveGalleryLink,
        coffeeValue: body?.coffeeValue,
        startDate: body?.startDate,
        endDate: body?.endDate,
      });

      return {
        statusCode: 200,
        body: { success: true }
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

interface EventUpdateParams {
  eventId: number
  eventName?: string;
  local?: string;
  description?: string;
  driveGalleryLink?: string;
  coffeeValue?: string;
  startDate?: string;
  endDate?: string;
}

async function updateEventById(client: GaiaClientDb, eventUpdate: EventUpdateParams) {
  let query = 'UPDATE "event" SET'

  const { queryUpdates, valuesUpdates } = verifyColumnsToUpdate(eventUpdate)

  query += queryUpdates
  query += ' WHERE id = $eventId'

  await client.query({
    query,
    values: {
      ...valuesUpdates,
      eventId: eventUpdate.eventId,
    },
  });
}

function verifyColumnsToUpdate(eventUpdate: EventUpdateParams){
  let queryUpdates = ''
  const valuesUpdates:EventUpdateParams = {
    eventId: 0
  }

  if (eventUpdate.eventName) {
    queryUpdates += ' name = $eventName '
    valuesUpdates['eventName'] = eventUpdate.eventName
  }

  if (eventUpdate.local) {
    queryUpdates += ',local = $local '
    valuesUpdates['local'] = eventUpdate.local
  }

  if (eventUpdate.description) {
    queryUpdates += ',description = $description '
    valuesUpdates['description'] = eventUpdate.description
  }

  if (eventUpdate.driveGalleryLink) {
    queryUpdates += ',gallery_url = $driveGalleryLink '
    valuesUpdates['driveGalleryLink'] = eventUpdate.driveGalleryLink
  }

  if (eventUpdate.coffeeValue) {
    queryUpdates += ',coffee_value = $coffeeValue '
    valuesUpdates['coffeeValue'] = eventUpdate.coffeeValue
  }

  if (eventUpdate.startDate) {
    queryUpdates += ',start_date = $startDate '
    valuesUpdates['startDate'] = eventUpdate.startDate
  }

  if (eventUpdate.endDate) {
    queryUpdates += ',end_date = $endDate '
    valuesUpdates['endDate'] = eventUpdate.endDate
  }

  return {
    queryUpdates,
    valuesUpdates
  }
}
