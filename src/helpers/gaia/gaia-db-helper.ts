import pg from "pg";
const { Pool } = pg;

export class GaiaDBHelper {
  // private pool;

  private user: string;
  private host: string;
  private datababe: string;
  private password: string;
  private port: number;

  constructor() {
    // this.pool = new Pool({
    //   user: process.env.DB_USER || "",
    //   host: process.env.DB_HOST || "",
    //   database: process.env.DB_DATA || "",
    //   password: process.env.DB_PASSWORD || "",
    //   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    // });
    this.user = process.env.DB_USER || "";
    this.host = process.env.DB_HOST || "";
    this.datababe = process.env.DB_DATA || "";
    this.password = process.env.DB_PASSWORD || "";
    this.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
  }

  async connectDB() {
    const config = {
      user: process.env.DB_USER || "",
      host: process.env.DB_HOST || "",
      database: process.env.DB_DATA || "",
      password: process.env.DB_PASSWORD || "",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    };

    const pool = new Pool(config);

    const client = await pool.connect();

    console.log(
      `\nPostgreSQL conectado com sucesso em ${config.host}:${config.port}`
    );

    try {
      const result = await client.query(`SELECT * FROM "user"`);
      console.log(result.rows);
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }
}
