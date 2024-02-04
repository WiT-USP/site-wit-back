import pg, { PoolClient } from "pg";
const { Pool } = pg;

import { ClientTransation } from "./client-transaction";
import { queryFormat } from "./formatingQuery";
import {
  GaiaClienteQueryParams,
  GaiaClienteQueryWithoutFormattingParams,
} from "./types";

export class GaiaClientDb {
  private client: PoolClient;
  transaction: ClientTransation;

  constructor(client: PoolClient) {
    this.client = client;
    this.transaction = new ClientTransation(client);
  }

  async query(params: GaiaClienteQueryParams) {
    const { query, values } = queryFormat(params);
    console.log("[GaiaClientDb] Query formated:", query, values);
    const { rows } = await this.client.query({ text: query, values });

    return rows;
  }

  async queryWithoutFormatting(
    params: GaiaClienteQueryWithoutFormattingParams
  ) {
    const values = params.values || [];
    console.log("[GaiaClientDb] Query:", params.query, values);
    const { rows } = await this.client.query({ text: params.query, values });

    return rows;
  }

  release() {
    this.client.release();
  }
}
