const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Skater597.", // replace with your MySQL root password
  database: "fitness_tracker",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) throw err;
    res.send("User registered");
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send("User logged in");
    } else {
      res.send("Invalid credentials");
    }
  });
});

app.post("/add-activity", (req, res) => {
  const { user_id, type, duration, date } = req.body;
  const sql =
    "INSERT INTO activities (user_id, type, duration, date) VALUES (?, ?, ?, ?)";
  db.query(sql, [user_id, type, duration, date], (err, result) => {
    if (err) throw err;
    res.send("Activity added");
  });
});

app.get("/activities", (req, res) => {
  const { user_id } = req.query;
  const sql = "SELECT * FROM activities WHERE user_id = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
