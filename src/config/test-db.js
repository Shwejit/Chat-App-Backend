import pool from "./db.js";

try {
  const result = await pool.query("SELECT NOW()");

  console.log("Database Connected");
  console.log(result.rows[0]);
} catch (error) {
  console.error(error);
}