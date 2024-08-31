import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthFormDto } from 'src/dtos/forms/auth.form.dto';
import { AuthDto } from 'src/dtos/responses/auth.response.dto';
import { ApiBaseResponse } from 'src/dtos/responses/api.base.response';
import { ComparePassword } from 'src/helpers/auth.hepler';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(authFormDto: AuthFormDto): Promise<ApiBaseResponse<AuthDto>> {
        try {
            const user = await this.userService.findByUsername(authFormDto.username);
            const isMatch = await ComparePassword(authFormDto.password, user.data.password);

            if (!isMatch) {
                throw new HttpException(
                    {
                        success: false,
                        statusCode: HttpStatus.UNAUTHORIZED,
                        message: 'Invalid username or password',
                        error: 'Invalid username or password'
                    },
                    HttpStatus.UNAUTHORIZED
                );
            }

            return {
                success: true,
                statusCode: 201,
                message: `Login success, hello ${user.data.username}!`,
                data: {
                    username: user.data.username,
                    token: this.jwtService.sign({ 
                        id: user.data.id, 
                        username: user.data.username 
                    })
                }
            }

        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    error: error.stack
                },
                error.status
            );
        }
    }
}
