require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/students", (req, res) => {
    const search = req.query.search || "";
    const sql = `
        SELECT * FROM students
        WHERE student_id LIKE ? OR name LIKE ? OR email LIKE ? OR course LIKE ?
        ORDER BY id DESC
    `;
    const value = `%${search}%`;
    db.query(sql, [value, value, value, value], (err, results) => {
        if (err) return res.status(500).json({ message: "Failed to fetch students" });
        res.json(results);
    });
});

app.get("/api/students/:id", (req, res) => {
    db.query("SELECT * FROM students WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Student not found" });
        res.json(results[0]);
    });
});

app.post("/api/students", (req, res) => {
    const { student_id, name, email, phone, course, year, address } = req.body;

    if (!student_id || !name || !email || !course || !year) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    const sql = `
        INSERT INTO students
        (student_id, name, email, phone, course, year, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        student_id, name, email, phone || "", course, year, address || ""
    ], (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ message: "Student ID already exists" });
            }
            return res.status(500).json({ message: "Failed to add student" });
        }
        res.status(201).json({
            message: "Student added successfully",
            id: result.insertId
        });
    });
});

app.put("/api/students/:id", (req, res) => {
    const { student_id, name, email, phone, course, year, address } = req.body;

    if (!student_id || !name || !email || !course || !year) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    const sql = `
        UPDATE students
        SET student_id=?, name=?, email=?, phone=?, course=?, year=?, address=?
        WHERE id=?
    `;

    db.query(sql, [
        student_id, name, email, phone || "", course, year, address || "", req.params.id
    ], (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ message: "Student ID already exists" });
            }
            return res.status(500).json({ message: "Failed to update student" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student updated successfully" });
    });
});

app.delete("/api/students/:id", (req, res) => {
    db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Failed to delete student" });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
