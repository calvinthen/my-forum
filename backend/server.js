const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// connect to SQLite database (file-based)
const db = new sqlite3.Database("./mydb.sqlite", (err) => {
  if (err) console.error("❌ Error opening DB:", err.message);
  else console.log("✅ Connected to SQLite database.");
});

// create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS posts_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT
)`);


// Add a post status
app.post("/posts-status", (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content required" });

  db.run(`INSERT INTO posts_status (content) VALUES (?)`, [content], function (err) {
    if (err) res.status(400).json({ error: err.message });
    else res.json({ id: this.lastID, content });
  });
});

// ✅ Get all posts
app.get("/posts-status", (req, res) => {
  db.all("SELECT * FROM posts_status ORDER BY id ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ Delete a post (optional)
app.delete("/posts-status/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM posts_status WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});


// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
