import { GaiaClientDb, GaiaPoolDb } from "helpers";
import { Controller } from "protocols/controller";
import { HttpRequest, HttpResponse } from "protocols/http";
import { Body } from "./types";

const pool = new GaiaPoolDb();

export class UpdateActivityByIdController implements Controller {
  async handle(request: HttpRequest<Body>): Promise<HttpResponse> {
    console.log("Start event Controller: ", request);

    const client = await pool.connect();

    const activityId = parseInt(request.params?.activityId!);
    const body = request.body

    try {
      await updateActivityById(client, {
        activityId,
        activityName: body?.activityName,
        description: body?.description,
        startTime: body?.startTime,
        endTime: body?.endTime,
        responsible: body?.responsible,
        registrationAt: body.registrationAt,
        eventId: body?.eventId
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

interface ActivityUpdateParams {
  activityId: number
  activityName?: string;
  responsible?: string;
  description?: string;
  startTime?: string;
  endTime?: string; 
  registrationAt?: string
  eventId?: number
}

async function updateActivityById(client: GaiaClientDb, eventUpdate: ActivityUpdateParams) {
  let query = 'UPDATE "activity" SET'

  const { queryUpdates, valuesUpdates } = verifyColumnsToUpdate(eventUpdate)

  query += queryUpdates
  query += ' WHERE id = $activityId'

  await client.query({
    query,
    values: {
      ...valuesUpdates,
      activityId: eventUpdate.activityId,
    },
  });
}

function verifyColumnsToUpdate(eventUpdate: ActivityUpdateParams){
  let queryUpdates = ''
  const valuesUpdates:ActivityUpdateParams = {
    activityId: 0
  }

  if (eventUpdate.activityName) {
    queryUpdates += ' name = $activityName '
    valuesUpdates['activityName'] = eventUpdate.activityName
  }

  if (eventUpdate.description) {
    queryUpdates += ',description = $description '
    valuesUpdates['description'] = eventUpdate.description
  }

  if (eventUpdate.responsible) {
    queryUpdates += ',responsible = $responsible '
    valuesUpdates['responsible'] = eventUpdate.responsible
  }

  if (eventUpdate.registrationAt) {
    queryUpdates += ',registration_at = $registrationAt '
    valuesUpdates['registrationAt'] = eventUpdate.registrationAt
  }

  if (eventUpdate.eventId) {
    queryUpdates += ',event_id = $eventId '
    valuesUpdates['eventId'] = eventUpdate.eventId
  }

  if (eventUpdate.startTime) {
    queryUpdates += ',start_time = $startTime '
    valuesUpdates['startTime'] = eventUpdate.startTime
  }

  if (eventUpdate.endTime) {
    queryUpdates += ',end_time = $endTime '
    valuesUpdates['endTime'] = eventUpdate.endTime
  }

  return {
    queryUpdates,
    valuesUpdates
  }
}
