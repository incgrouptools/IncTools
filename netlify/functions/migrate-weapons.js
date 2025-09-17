// netlify/functions/migrate-weapons.js
const { neon } = require("@netlify/neon");

const sql = neon(); // uses NETLIFY_DATABASE_URL

exports.handler = async () => {
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
};
