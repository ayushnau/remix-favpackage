export default {
  client: "pg",
  debug: false,
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "favorite_packages",
  },
  migrations: {
    directory: "./database/migrations",
    tableName: "migrations",
  },
};
