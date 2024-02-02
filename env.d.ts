declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: number;
      API_HOST: string;

      DB_USER: string;
      DB_HOST: string;
      DB_database: string;
      DB_PASSWORD: string;
      DB_PORT: number;
    }
  }
}
