import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Create a new user
    @Post()
    async createUser(@Body(new ValidationPipe()) data: CreateUserDto): Promise<User> {
        return this.userService.createUser(data);
    }

    // Retrieve all users
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    // Retrieve a single user by ID
    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    // Update a user
    @Put(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() data: Partial<User>,
    ): Promise<User> {
        return this.userService.updateUser(id, data);
    }

    // Delete a user
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
