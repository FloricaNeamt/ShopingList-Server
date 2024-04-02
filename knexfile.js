const config = {
  client: "pg",
  connection: {
    host: "localhost", // Change to your actual database host
    user: "postgres", // Change to your actual database username
    database: "ShopingList", // Change to your actual database name
  },
  //fdffd
  useNullAsDefault: true,
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
export default config;
