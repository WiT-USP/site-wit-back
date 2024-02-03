import pg, { PoolClient } from "pg";
import { ClientTransation } from "./client-transaction";
const { Pool } = pg;

export class GaiaClientDb {
  private client: PoolClient;
  transaction: ClientTransation;

  constructor(client: PoolClient) {
    this.client = client;
    this.transaction = new ClientTransation(client);
  }

  async query() {
    // aqui vai ficar a lógica que vai abstrair a chamada de query no BD, de forma passar apenas dois parametros query: string e values: Object
    // Provável que vai ser necessário uma func de formatar
  }

  queryWithoutFormatting() {
    // vai ser algo muito próximo do método padrão de query do próprio pg
  }
  release() {
    this.client.release();
  }
}
