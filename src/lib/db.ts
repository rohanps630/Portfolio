import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "";

const sql = postgres(connectionString, {
  prepare: false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export default sql;
