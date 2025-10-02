const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// connect to SQLite database (file-based)
const db = new sqlite3.Database("./mydb.sqlite", (err) => {
  if (err) console.error("❌ Error opening DB:", err.message);
  else console.log("✅ Connected to SQLite database.");
});

// create tables if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  photo TEXT DEFAULT 'https://cdn.shopify.com/s/files/1/0747/5317/9944/files/furina_901c3b85-7c17-44c9-bcea-a7e434d864b5_600x600.jpg?v=1718073582'
)`);

db.run(`CREATE TABLE IF NOT EXISTS posts_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);


// Add a post status
app.post("/posts-status", (req, res) => {
  const { content, user_id } = req.body;
  if (!content || !user_id) return res.status(400).json({ error: "Content and user required" });

  db.run(
    `INSERT INTO posts_status (content, user_id) VALUES (?, ?)`,
    [content, user_id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, content, user_id });
    }
  );
});

// ✅ Get all posts
app.get("/posts-status", (req, res) => {
  const query = `
    SELECT posts_status.id, posts_status.content, users.username, users.photo
    FROM posts_status
    JOIN users ON posts_status.user_id = users.id
    ORDER BY posts_status.id DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ Delete a post
app.delete("/posts-status/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM posts_status WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// ✅ Register new user with password validation
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  // Password must be at least 6 chars, include letters and numbers
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Password must be at least 6 characters long and include both letters and numbers.",
    });
  }

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
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login user
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "Invalid username or password" });

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: "Invalid username or password" });

      res.json({ 
        message: "Login successful", 
        id: user.id,  
        username: user.username, 
        photo: user.photo 
      });

    } catch {
      res.status(500).json({ error: "Server error" });
    }
  });
});


//DELETE TABLES - for testing purposes only

// ⚠️ Drop table ONCE posts_status
// db.run(`DROP TABLE posts_status`, (err) => {
//   if (err) console.error("❌ Error dropping table:", err.message);
//   else console.log("✅ posts_status table dropped");
// });

// ⚠️ Drop table ONCE users
// db.run(`DROP TABLE users`, (err) => {
//   if (err) console.error("❌ Error dropping table:", err.message);
//   else console.log("✅ posts_status table dropped");
// });


// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));