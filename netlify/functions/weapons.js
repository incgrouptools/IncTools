// netlify/functions/weapons.js
const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "weapons.json");

// Ensure weapons.json exists
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
  }
}

exports.handler = async (event) => {
  initDB();

  if (event.httpMethod === "GET") {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return {
      statusCode: 200,
      body: data,
      headers: { "Content-Type": "application/json" },
    };
  }

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
      const weapons = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      weapons.push({
        id: Date.now(),
        name: body.name,
        type: body.type,
        notes: body.notes,
      });
      fs.writeFileSync(DB_FILE, JSON.stringify(weapons, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } catch (err) {
      return { statusCode: 400, body: "Invalid data" };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
