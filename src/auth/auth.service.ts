import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helpers/helper';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    /**
     * This function is responsible for validating given user email and password.
     * If email and password validated and then generating the access_token for user
     * 
     * @param email 
     * @param password 
     * @returns 
     */
    async login(email: string, password: string): Promise<any> {

        const user = await this.userService.getUserByEmail(email);

        const isPasswordValid = await comparePassword(password, user.password);

        if (user && !isPasswordValid) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.email };
        const accessToken = await this.jwtService.signAsync(payload)
        user['token'] = accessToken;
        return user;
    }
}
