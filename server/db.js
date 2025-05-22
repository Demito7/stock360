import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "2355",
  host: "localhost",
  port: 5432,
  database: "stock360"
});

export default pool;