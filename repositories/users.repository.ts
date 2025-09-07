import { query, usersMigrations } from "@/config/mysql.config";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export class UsersRepository {
    async getAll() {
        const users = await query('SELECT * FROM users');
        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await query<User>('SELECT * FROM users WHERE email = ?', [email]);
        return user[0] as User;
    }

    async create(user: { name: string, email: string, password: string }) {
        const { name, email, password } = user;
        const result = await query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        return result;
    }
}