const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Skater597.",
  database: "fitness_tracker",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database.");
  }
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      res.status(500).send("Error registering user.");
    } else {
      res.status(200).send({ message: "User registered successfully." });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Error logging in.");
    } else if (results.length > 0) {
      res.status(200).send({ user: results[0] });
    } else {
      res.status(401).send("Invalid credentials.");
    }
  });
});

app.post("/add-activity", (req, res) => {
  const { user_id, type, weight, sets, reps, date } = req.body;
  const sql =
    "INSERT INTO activities (user_id, type, weight, sets, reps, date) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [user_id, type, weight, sets, reps, date], (err, result) => {
    if (err) {
      console.error("Error adding activity:", err);
      res.status(500).send("Error adding activity.");
    } else {
      res.status(200).send({ message: "Activity added successfully." });
    }
  });
});

app.get("/activities", (req, res) => {
  const userId = req.query.user_id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  const sql = "SELECT * FROM activities WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching activities:", err);
      res.status(500).json({ error: "Error fetching activities" });
    } else {
      res.json({ activities: result });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
