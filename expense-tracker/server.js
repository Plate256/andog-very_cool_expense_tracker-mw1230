const express = require("express");
const path = require("path");
const mysql = require("mysql");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Main.html"));
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expense_tracker_db"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/api/expenses", (req, res) => {
    const sql = "SELECT * FROM expenses ORDER BY date DESC, id DESC";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error"
            })
        }
        res.json(results);
    })
});

app.get("/api/expenses/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM expenses WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (!results.length) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json(results[0]);
    });
});

app.post("/api/expenses", (req, res) => {
    const { title, category, amount, date } = req.body;
    if (!title || !category || !amount || !date) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    const sql = "INSERT INTO expenses (title, category, amount, date) VALUES (?, ?, ?, ?)";

    db.query(sql, [title, category, amount, date], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to add expense",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Expense added successfully",
            expenseId: result.insertId
        });
    });
});

app.put("/api/expenses/:id", (req, res) => {
    const { id } = req.params;
    const { title, category, amount, date } = req.body;

    if (!title || !category || !amount || !date) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    const sql = "UPDATE expenses SET title = ?, category = ?, amount = ?, date = ? WHERE id = ?";

    db.query(sql, [title, category, amount, date, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to update expense",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense updated successfully",
            expenseId: Number(id)
        });
    });
});

app.delete("/api/expenses/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM expenses WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to delete expense",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully",
            expenseId: Number(id)
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});