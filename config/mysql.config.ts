// create a mysql query service
import mysql from 'mysql2/promise';
import process from 'node:process';

const poolOptions: mysql.PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

const pool = mysql.createPool(poolOptions);

export default pool;

export async function query<T>(sql: string, values?: any[]): Promise<T[]> {
    const [rows] = await pool.execute(sql, values);
    return rows as T[];
}

export async function usersMigrations() {
    console.log('migrating users...');
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `;

    await query(sql);
    console.log('users migration completed.');
}

export async function runAllMigrations() {
    await usersMigrations();
}