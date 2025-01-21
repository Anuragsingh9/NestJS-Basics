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

@Controller('auth')
// @UseGuards(RolesGuard)
export class AuthController {

    constructor(private readonly authService: AuthService, private userService: UserService) { }

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
            return sendHttpResponse(200, 'Login successful', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error logging in', error.message);
        }
    }

    @Post('register')
    async register(@Body(new ValidationPipe()) data: CreateUserDto): Promise<any> {
        try {
            const hashedPassword = await hashPassword(data.password);
            const user = await this.userService.createUser({ ...data, password: hashedPassword });
            return sendHttpResponse(201, 'User created successfully', user);
        } catch (error) {
            return sendHttpResponse(400, 'Error creating user', error.message);
        }
    }

    // @Get('profile')
    // @Roles(Role.User)
    // @UseGuards(AuthGuard)
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}

