import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { SignInDto } from './signin.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { send } from 'process';
import { comparePassword, hashPassword, sendHttpResponse } from 'src/helpers/helper';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './register.dto';
import { EmailService } from 'src/common/email.service';
import { loginTemplate, registerTemplate } from 'src/email/email-template';
require('dotenv').config();

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private userService: UserService, private emailService: EmailService) { }

    /**
     * This function is responsible for authenticating user and generating token
     * for the user
     * 
     * @param data 
     * @returns User Object
     */
    @Post('login')
    async login(@Body(new ValidationPipe()) data: SignInDto): Promise<any> {
        try {

            const userByEmail = await this.userService.getUserByEmail(data.email);
            if (!userByEmail) {
                return sendHttpResponse(400, 'User not found', null);
            }

            const user = await this.authService.login(data.email, data.password);
            this.emailService.sendEmail(user.email, 'Login Successful', 'Login Successful', loginTemplate(user));

            return sendHttpResponse(200, 'Login successful', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error logging in', error.message);
        }
    }

    /**
     * This function is responsible for registering a new user
     * @param data 
     * @returns 
     */
    @Post('register')
    async register(@Body(new ValidationPipe()) data: CreateUserDto): Promise<any> {
        try {
            const hashedPassword = await hashPassword(data.password);
            const user = await this.userService.createUser({ ...data, password: hashedPassword });
            this.emailService.sendEmail(user.email, 'Login Successful', 'Login Successful', registerTemplate(user));

            return sendHttpResponse(201, 'User created successfully', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error creating user', error.message);
        }
    }
}

