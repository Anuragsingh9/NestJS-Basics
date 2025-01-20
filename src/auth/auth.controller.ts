import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { SignInDto } from './signin.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/gaurds/roles.gaurd';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    /**
     * This function is responsible for authenticating user and generating token
     * for the user
     * 
     * @param data 
     * @returns User Object
     */
    @Post('login')
    async login(@Body(new ValidationPipe()) data: SignInDto): Promise<any> {
        return this.authService.login(data.email, data.password)
    }

    // @Get('profile')
    // @Roles(Role.User)
    // @UseGuards(AuthGuard)
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}

