import pg from "pg";
import { GaiaClientDb } from "../../../gaia";
const { Pool } = pg;

export class GaiaPoolDb {
  private user: string;
  private host: string;
  private datababe: string;
  private password: string;
  private port: number;

  constructor() {
    this.user = process.env.DB_USER || "";
    this.host = process.env.DB_HOST || "";
    this.datababe = process.env.DB_DATA || "";
    this.password = process.env.DB_PASSWORD || "";
    this.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
  }

  async connect() {
    const config = {
      user: this.user,
      host: this.host,
      database: this.datababe,
      password: this.password,
      port: this.port,
    };
    console.log(`\n[Gaia Pool Conection] Started...`);
    const pool = new Pool(config);

    const client = await pool.connect();
    console.log(
      `\n[Gaia Pool Conection] PostgreSQL connected successfully ${config.host}:${config.port}`
    );

    return new GaiaClientDb(client);
  }
}

export { GaiaClientDb };
