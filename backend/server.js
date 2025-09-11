const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt"); // ✅ add bcrypt for hashing

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

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
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

// ✅ Register new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE"))
            return res.status(400).json({ error: "Username already taken" });
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, username });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
