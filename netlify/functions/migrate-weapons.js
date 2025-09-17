// netlify/functions/migrate-weapons.js
import { neon } from "@netlify/neon/serverless";

const sql = neon(); // uses NETLIFY_DATABASE_URL

export async function handler() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS weapons (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        damage INT,
        accuracy INT,
        rw_bonus TEXT,
        effect INT,
        loaned TEXT
      );
    `;
    return {
      statusCode: 200,
      body: "Weapons table created (or already exists).",
    };
  } catch (err) {
    return { statusCode: 500, body: "Migration failed: " + err.message };
  }
}
