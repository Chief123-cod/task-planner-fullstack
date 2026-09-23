const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_task_planner'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Gagal terhubung ke database:', err);
        return;
    }
    console.log('✅ Berhasil terhubung ke database MySQL XAMPP!');
});

// ==========================================
// KATEGORI ENDPOINTS
// ==========================================

// GET: Ambil semua daftar kategori
app.get('/api/categories', (req, res) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST: Tambah Kategori Baru
app.post('/api/categories', (req, res) => {
    const { name, color = '#3B82F6' } = req.body; // Default warna biru jika kosong

    if (!name) {
        return res.status(400).json({ message: "Nama kategori wajib diisi" });
    }

    const sql = "INSERT INTO categories (name, color) VALUES (?, ?)";
    db.query(sql, [name, color], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: "Kategori berhasil ditambahkan",
            id: result.insertId,
            name,
            color
        });
    });
});

// DELETE: Hapus Kategori
app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM categories WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Kategori berhasil dihapus" });
    });
});

// ==========================================
// TUGAS (TASKS) ENDPOINTS
// ==========================================

// GET: Ambil semua tugas + join kategori
app.get('/api/tasks', (req, res) => {
    const sql = `
        SELECT tasks.*, categories.name as category, categories.color 
        FROM tasks 
        LEFT JOIN categories ON tasks.category_id = categories.id
        ORDER BY tasks.id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST: Tambah tugas baru dengan category_id dinamis
app.post('/api/tasks', (req, res) => {
    const { title, category_id } = req.body;

    // Jika tidak memilih kategori, default set NULL atau ID default
    const sql = "INSERT INTO tasks (title, category_id, status) VALUES (?, ?, 'pending')";

    db.query(sql, [title, category_id || null], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Tugas berhasil ditambahkan", id: result.insertId });
    });
});

// PUT: Ubah status tugas
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status tugas berhasil diperbarui" });
    });
});

// DELETE: Hapus tugas
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Tugas berhasil dihapus" });
    });
});

app.listen(port, () => {
    console.log(`🚀 Server backend berjalan di http://localhost:${port}`);
});