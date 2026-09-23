require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
    try {
        console.log('⏳ Sedang menghubungkan ke MySQL Cloud Aiven...');

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false }
        });

        console.log('✅ Terhubung! Membuat tabel categories dan tasks...');

        // Buat Tabel Categories
        await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                color VARCHAR(20) DEFAULT '#3B82F6',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Buat Tabel Tasks
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category_id INT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NULL,
                status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
                priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
                due_date DATE NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT fk_tasks_categories 
                    FOREIGN KEY (category_id) REFERENCES categories(id) 
                    ON DELETE SET NULL 
                    ON UPDATE CASCADE
            );
        `);

        // Isi Kategori Awal
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM categories');
        if (rows[0].count === 0) {
            await connection.query(`
                INSERT INTO categories (name, color) VALUES 
                ('Kuliah', '#EF4444'),
                ('Pribadi', '#10B981'),
                ('Project React', '#8B5CF6');
            `);
            console.log('✅ Data kategori awal berhasil ditambahkan.');
        }

        console.log('🎉 BERHASIL! Semua tabel sudah dibuat di Cloud Aiven!');
        await connection.end();
    } catch (err) {
        console.error('❌ Gagal melakukan setup database:', err);
    }
}

setupDatabase();