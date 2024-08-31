import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Patch, 
    Delete, 
    Param, 
    Body,
    UseGuards
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../guards/auth.guard';
import { 
    ApiParam,
    ApiBody, 
    ApiOkResponse, 
    ApiBadRequestResponse, 
    ApiNotFoundResponse, 
    ApiInternalServerErrorResponse, 
    ApiCreatedResponse, 
    ApiTags,
    ApiOperation,
    ApiUnauthorizedResponse,
    ApiBearerAuth
} from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/dtos/responses/api.base.response';
import { UserFormDto } from 'src/dtos/forms/user.form.dto';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User Collection')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('fetch')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Fetch users data from api jsonplaceholder.typicode.com' })
    @ApiOkResponse({ type: ApiBaseResponse, status: 200, description: 'Success fetch users' })
    @ApiUnauthorizedResponse({ type: ApiBaseResponse, status: 401, description: 'Unauthorized' })
    async fetchUsers() {
        return await this.userService.fetchUsers();
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get users data from database' })
    @ApiOkResponse({ type: ApiBaseResponse, status: 200, description: 'Success get users' })
    @ApiBadRequestResponse({ type: ApiBaseResponse, status: 400, description: 'Failed get users' })
    @ApiNotFoundResponse({ type: ApiBaseResponse, status: 404, description: 'Users not found' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ type: ApiBaseResponse, status: 500, description: 'Unexpected error' })
    async getAllUser() {
        return await this.userService.getAllUser();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get user data from jsonplaceholder.typicode.com by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: ApiBaseResponse, status: 200, description: 'Success get user' })
    @ApiBadRequestResponse({ type: ApiBaseResponse, status: 400, description: 'Failed get user' })
    @ApiNotFoundResponse({ type: ApiBaseResponse, status: 404, description: 'User not found' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ type: ApiBaseResponse, status: 500, description: 'Unexpected error' })
    async getOneUser(@Param('id') id: number) {
        return await this.userService.getOneUser(id);
    }

    @Post('sync')
    @ApiOperation({ summary: 'Get users data from api jsonplaceholder.typicode.com and save to database' })
    @ApiCreatedResponse({ type: ApiBaseResponse, status: 201, description: 'Success sync users' })
    @ApiBadRequestResponse({ type: ApiBaseResponse, status: 400, description: 'Failed sync users' })
    @ApiNotFoundResponse({ type: ApiBaseResponse, status: 404, description: 'Users not found' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ type: ApiBaseResponse, status: 500, description: 'Unexpected error' })
    async syncUsers() {
        return await this.userService.syncUsers();
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create user data to jsonplaceholder.typicode.com' })
    @ApiBody({ type: UserFormDto })
    @ApiCreatedResponse({ type: ApiBaseResponse, status: 201, description: 'Success create user' })
    @ApiBadRequestResponse({ type: ApiBaseResponse, status: 400, description: 'Failed create user' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ type: ApiBaseResponse, status: 500, description: 'Unexpected error' })
    async createUser(@Body() userData: UserFormDto) {
        return await this.userService.createUser(userData);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update user data to jsonplaceholder.typicode.com using put mehod' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UserFormDto })
    @ApiOkResponse({ type: ApiBaseResponse, status: 200, description: 'Success update user' })
    @ApiBadRequestResponse({ type: ApiBaseResponse, status: 400, description: 'Failed update user' })
    @ApiNotFoundResponse({ type: ApiBaseResponse, status: 404, description: 'User not found' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ type: ApiBaseResponse, status: 500, description: 'Unexpected error' })
    async putUser(@Param('id') id: number, @Body() userData: UserFormDto) {
        return await this.userService.putUser(id, userData);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update user data to jsonplaceholder.typicode.com using patch mehod' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UserFormDto })
    @ApiOkResponse({ type: ApiBaseResponse, status: 200, description: 'Success update user' })
    @ApiBadRequestResponse({ type: ApiBaseResponse, status: 400, description: 'Failed update user' })
    @ApiNotFoundResponse({ type: ApiBaseResponse, status: 404, description: 'User not found' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ type: ApiBaseResponse, status: 500, description: 'Unexpected error' })
    async patchUser(@Param('id') id: number, @Body() userData: UserFormDto) {
        return await this.userService.patchUser(id, userData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Delete user data from jsonplaceholder.typicode.com by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: ApiBaseResponse, status: 200, description: 'Success delete user' })
    @ApiBadRequestResponse({ type: ApiBaseResponse, status: 400, description: 'Failed delete user' })
    @ApiNotFoundResponse({ type: ApiBaseResponse, status: 404, description: 'User not found' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ type: ApiBaseResponse, status: 500, description: 'Unexpected error' })
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }
    
}
