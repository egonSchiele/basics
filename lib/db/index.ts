import "reflect-metadata";
import { DataSource } from "typeorm";
import { Paste } from "./entity/Paste";
import { getConfig, log } from "@/lib/utils";
import init from "@/commands/init";

let _connection: DataSource | null = null;

export async function dbConnection() {
  if (_connection) {
    return _connection;
  }

  let config = getConfig();
  if (!config) {
    await init();
    config = getConfig();
  }
  log("initializing db connection...");

  // TypeORM will create the tables for you,
  // but you will need to create the database yourself first.
  _connection = new DataSource({
    type: "postgres",
    host: config!.host,
    port: config!.port,
    username: config!.username,
    password: config!.password,
    database: "paste",
    entities: [Paste],
    synchronize: true,
    logging: false,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  // to initialize the initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  await _connection.initialize();
  log("db connection initialized.\n");
  return _connection;
}

export async function getPasteRepository() {
  const connection = await dbConnection();
  return connection.getRepository(Paste);
}
