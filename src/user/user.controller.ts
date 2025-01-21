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
import { EmailService } from 'src/common/email.service';
import { registerTemplate } from 'src/email/email-template';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
    
    constructor(private readonly userService: UserService, private emailService: EmailService) { }

    /**
     * This function is responsible for fetching the logged in user profile
     * @param req 
     * @returns 
     */
    @Get('/profile')
    async getLoggedInUserProfile(@Request() req) {
        try {
            return sendHttpResponse(200, 'User profile fetched successfully', req.user);
        } catch (error) {
            return sendHttpResponse(400, 'Error fetching user profile', error.message);
        }
    }

    /**
     * This function is responsible for creating a new user
     * @param data 
     * @returns 
     */
    @Post()
    @Roles(Role.Admin)
    async createUser(@Body(new ValidationPipe()) data: CreateUserDto): Promise<ApiResponseDto<User>> {
        try {
            const hashedPassword = await hashPassword(data.password);
            const user = await this.userService.createUser({ ...data, password: hashedPassword });
            this.emailService.sendEmail(user.email, 'Login Successful', 'Login Successful', registerTemplate(user));

            return sendHttpResponse(201, 'User created successfully', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error creating user', error.message);
        }
    }

    /**
     * This function is responsible for fetching all users
     * @returns 
     */
    @Get()
    async getAllUsers(): Promise<ApiResponseDto<User[]>> {
        try {
            const users = await this.userService.getAllUsers();
            return sendHttpResponse(200, 'Users fetched successfully', users);
        } catch (error) {
            return sendHttpResponse(400, 'Error fetching users', error.message);

        }
    }

    /**
     * This function is responsible for fetching a single user by ID
     * @param id 
     * @returns 
     */
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

    /**
     * This function is responsible for updating a user
     * @param id 
     * @param data 
     * @returns 
     */
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

    /**
     * This function is responsible for deleting a user
     * @param id 
     * @returns 
     */
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
}
