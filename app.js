const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get("/search/:category", async (req, res) => {
  try {
const sql =
  "SELECT * FROM products WHERE category = '" +
  req.params.category +
  "'";

const result = await pool.query(sql);

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

module.exports = app;
