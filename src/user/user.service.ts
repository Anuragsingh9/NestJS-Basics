import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // Create a new user
    async createUser(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    // Retrieve all users
    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Retrieve a single user by ID
    async getUserById(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    // Retrieve user by email
    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } })
    }
    // Update a user
    async updateUser(id: number, data: Partial<User>): Promise<User> {
        await this.userRepository.update(id, data);
        return this.getUserById(id);
    }

    // Delete a user
    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
