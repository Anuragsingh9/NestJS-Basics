import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { hashPassword, sendHttpResponse } from 'src/helpers/helper';
import { ApiResponseDto } from 'src/common/api-response.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/profile')
    async getLoggedInUserProfile(@Request() req) {
        try {
            return sendHttpResponse(200, 'User profile fetched successfully', req.user);
        } catch (error) {
            return sendHttpResponse(400, 'Error fetching user profile', error.message);
        }
    }

    // Create a new user
    @Post()
    @Roles(Role.Admin)
    async createUser(@Body(new ValidationPipe()) data: CreateUserDto): Promise<ApiResponseDto<User>> {
        try {
            const hashedPassword = await hashPassword(data.password);
            const user = await this.userService.createUser({ ...data, password: hashedPassword });
            return sendHttpResponse(201, 'User created successfully', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error creating user', error.message);
        }
    }

    // Retrieve all users
    @Get()
    async getAllUsers(): Promise<ApiResponseDto<User[]>> {
        try {
            const users = await this.userService.getAllUsers();
            return sendHttpResponse(200, 'Users fetched successfully', users);
        } catch (error) {
            return sendHttpResponse(400, 'Error fetching users', error.message);

        }
    }

    // Retrieve a single user by ID
    @Get(':id')
    @Roles(Role.Admin)
    async getUserById(@Param('id') id: number): Promise<ApiResponseDto<User>> {
        try {
            const user = await this.userService.getUserById(id);
            return sendHttpResponse(200, 'User fetched successfully', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error fetching user', error.message);

        }
    }

    // Update a user
    @Put(':id')
    @Roles(Role.Admin)
    async updateUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<ApiResponseDto<User>> {
        try {
            const user = await this.userService.updateUser(id, data);
            return sendHttpResponse(200, 'User updated successfully', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error updating user', error.message);

        }
    }

    // Delete a user
    @Delete(':id')
    @Roles(Role.Admin)
    async deleteUser(@Param('id') id: number): Promise<ApiResponseDto<void>> {
        try {
            const usser = await this.userService.deleteUser(id);
            return sendHttpResponse(200, 'User deleted successfully', null);
        } catch (error) {
            return sendHttpResponse(400, 'Error deleting user', error.message);

        }
    }

    // @Get('/profile')
    // async getLoggedInUserProfile() {
    //     return 'User profile';
    // }


    // @Get('profile')
    // @Roles(Role.User)
    // @UseGuards(AuthGuard)
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}
