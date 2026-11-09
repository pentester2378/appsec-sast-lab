const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get("/search/:category", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT item, price FROM product WHERE item_category = $1",
      [req.params.category]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

module.exports = app;
