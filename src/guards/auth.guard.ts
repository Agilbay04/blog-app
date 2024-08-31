import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorized',
                    error: null
                }, HttpStatus.UNAUTHORIZED
            );
        }

    try {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.JWT_SECRET || 'PmlIi0Kew2',
            }
        );
        
        request['user'] = payload;

    } catch (error) {
        throw new HttpException(
            {
                success: false,
                statusCode: HttpStatus.UNAUTHORIZED,
                message: error.message,
                error: error.stack
            },
            HttpStatus.UNAUTHORIZED
        );

    }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}
