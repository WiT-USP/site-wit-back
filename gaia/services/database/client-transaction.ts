import pg, { PoolClient } from "pg";
const { Pool } = pg;

export class ClientTransation {
  private client: PoolClient;
  constructor(client: PoolClient) {
    this.client = client;
  }

  async start() {
    await this.client.query({ text: "BEGIN;" });
  }

  async end() {
    await this.client.query({ text: "END;" });
  }

  async rollback() {
    await this.client.query({ text: "ROLLBACK:" });
  }
}
