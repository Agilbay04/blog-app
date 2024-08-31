import { Body, Controller, Post } from '@nestjs/common';
import { 
    ApiBody, 
    ApiOperation, 
    ApiTags, 
    ApiOkResponse,
    ApiUnauthorizedResponse, 
    ApiCreatedResponse
} from '@nestjs/swagger';
import { AuthFormDto } from 'src/dtos/forms/auth.form.dto';
import { ApiBaseResponse } from 'src/dtos/responses/api.base.response';
import { AuthDto } from 'src/dtos/responses/auth.response.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
@ApiTags('Auth Collection')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiBody({ type: AuthFormDto })
    @ApiOperation({ summary: 'Login user' })
    @ApiCreatedResponse({ type: ApiBaseResponse, status: 201, description: 'Login success, hello username!' })
    @ApiUnauthorizedResponse({ type: ApiBaseResponse, status: 401, description: 'Invalid username or password' })
    async login(@Body() authFormDto: AuthFormDto): Promise<ApiBaseResponse<AuthDto>> {
        return await this.authService.login(authFormDto);
    }
}
