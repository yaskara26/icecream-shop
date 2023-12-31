import { Connection, createConnection, getConnectionOptions } from "typeorm";

const createDatabaseConnection = async (host = "localhost"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(
      defaultOptions,
      {
        host: process.env.NODE_ENV === "test" ? "localhost" : host,
        database: process.env.NODE_ENV === "test" ? "database_icecream" : defaultOptions.database
      }
    )
  );
};

export default createDatabaseConnection;
