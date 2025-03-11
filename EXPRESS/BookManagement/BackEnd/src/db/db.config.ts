import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "BookShop",
        password: "loyc3lmk", // Hardcoded password for testing
        port: 5432,
      
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected at:", res.rows[0].now);
  }
});

export default pool;
