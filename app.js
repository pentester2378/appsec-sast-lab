

const express = require("express");
const { Pool } = require("pg");
const { rateLimit } = require("express-rate-limit");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Limita ogni client a 100 richieste ogni 15 minuti
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false
});

// Applica il rate limiting alla route
app.get("/search/:category", limiter, async (req, res) => {
  try {
const sql = "SELECT * FROM products WHERE category = $1";

const result = await pool.query(sql, [req.params.category]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

module.exports = app;
