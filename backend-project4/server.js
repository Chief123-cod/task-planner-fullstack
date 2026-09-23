require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Koneksi ke Database Cloud Aiven
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.error('❌ Gagal terhubung ke database Cloud:', err);
        return;
    }
    console.log('✅ Berhasil terhubung ke database MySQL di Cloud (Aiven)!');
});

// ==========================================
// KATEGORI ENDPOINTS
// ==========================================
app.get('/api/categories', (req, res) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/categories', (req, res) => {
    const { name, color = '#3B82F6' } = req.body;
    if (!name) return res.status(400).json({ message: "Nama kategori wajib diisi" });

    const sql = "INSERT INTO categories (name, color) VALUES (?, ?)";
    db.query(sql, [name, color], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Kategori berhasil ditambahkan", id: result.insertId, name, color });
    });
});

app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM categories WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Kategori berhasil dihapus" });
    });
});

// ==========================================
// TUGAS (TASKS) ENDPOINTS
// ==========================================
app.get('/api/tasks', (req, res) => {
    const sql = `
        SELECT tasks.*, categories.name as category, categories.color 
        FROM tasks 
        LEFT JOIN categories ON tasks.category_id = categories.id
        ORDER BY tasks.id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, category_id } = req.body;
    const sql = "INSERT INTO tasks (title, category_id, status) VALUES (?, ?, 'pending')";
    db.query(sql, [title, category_id || null], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tugas berhasil ditambahkan", id: result.insertId });
    });
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Status tugas berhasil diperbarui" });
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tugas berhasil dihapus" });
    });
});

app.listen(port, () => {
    console.log(`🚀 Server backend berjalan di port ${port}`);
});

// WAJIB UNTUK VERCEL SERVERLESS:
module.exports = app;