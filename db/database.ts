import { Client } from "https://deno.land/x/postgres/mod.ts";
import { db } from "../config/database.ts";

const client = new Client({
  user: db.user,
  password: db.password,
  database: db.database,
  hostname: db.hostname,
  port: db.port,
});

await client.connect();

export default client;
