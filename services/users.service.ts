import { User, UsersRepository } from "@/repositories/users.repository";

export class UserService {
    usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async getAll() {
        const users = await this.usersRepository.getAll();
        return users;
    }

    async create(user: {name: string, email: string, password: string}) {
        const { name, email, password } = user;
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        const registeredUser: User = await this.usersRepository.findByEmail(email);
        if (registeredUser?.email === email) {
            return false;
        }

        const result = await this.usersRepository.create(user);
        return result;
    }

    async login(email: string, password: string) {
        const user: User = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Invalid password");
        }

        return user;
    }
}