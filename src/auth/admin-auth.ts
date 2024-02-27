import { GaiaPoolDb } from "helpers";

const pool = new GaiaPoolDb();

export async function authenticateAdminUser(token: string) {
  const client = await pool.connect();

  return true;
}
