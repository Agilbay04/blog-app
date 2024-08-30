import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserDto } from '../dtos/responses/user.dto.response';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserMapper } from 'src/mappers/user.mapper';
import { ApiBaseResponse } from 'src/dtos/responses/api.base.response';
import { UserFormDto } from 'src/dtos/forms/user.form.dto';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService, 
        private config: ConfigService,
        private httpService: HttpService
    ) {}

    async fetchUsers(): Promise<ApiBaseResponse<UserDto[]>> {
        let users = new Array<UserDto>();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.get(`${apiUrl}/users`));
            users = response.data;
        
            return {
                success: true,
                statusCode: 200,
                message: 'Users fetched successfully',
                data: await users,
            };
        
        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: [],
                    error: error.stack
                },
                error.status
            )
        }
    }

    async getAllUser(): Promise<ApiBaseResponse<UserDto[]>> {
        try {
            const users = (await this.prisma.user.findMany()).map(UserMapper);   
            const msg = users.length === 0 ? 'Users is empty' : 'Success get users';

            return {
                success: true,
                statusCode: 200,
                message: msg,
                data: users,
            };
        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: [],
                    error: error.stack
                },
                error.status
            )
        }
    }

    async getOneUser(id: number): Promise<ApiBaseResponse<UserDto>> {
        let user = new UserDto();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.get(`${apiUrl}/users/${id}`));
            user = response.data;

            return {
                success: true,
                statusCode: 200,
                message: 'Success get user',
                data: user,
            };
        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async createUser(userData: UserFormDto): Promise<ApiBaseResponse<UserDto>> {
        let user = new UserDto();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.post(`${apiUrl}/users`, userData));
            user = response.data;

            return {
                success: true,
                statusCode: response.status,
                message: 'Success create user',
                data: user,
            };

        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: user,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async putUser(id: number, userData: UserFormDto): Promise<ApiBaseResponse<UserDto>> {
        let user = new UserDto();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.put(`${apiUrl}/users/${id}`, userData));
            user = response.data;

            return {
                success: true,
                statusCode: response.status,
                message: 'Success update user',
                data: user,
            };

        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: user,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async patchUser(id: number, userData: UserFormDto): Promise<ApiBaseResponse<UserDto>> {
        let user = new UserDto();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.patch(`${apiUrl}/users/${id}`, userData));
            user = response.data;

            return {
                success: true,
                statusCode: response.status,
                message: 'Success update user',
                data: user,
            };

        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: user,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async deleteUser(id: number): Promise<ApiBaseResponse<void>> {
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.delete(`${apiUrl}/users/${id}`));
            console.log(response);

            return {
                success: true,
                statusCode: response.status,
                message: 'Success delete user',
            };

        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async syncUsers(): Promise<ApiBaseResponse<void>> {
        try {
            const users = (await this.fetchUsers());
            const msg = users.data.length === 0 ? 'Users is empty, nothing to save' : 'Success sync users';

            for (const user of users.data) {
                await this.saveDate(user);
            }

            return {
                success: true,
                statusCode: 200,
                message: msg,
            }
        } catch(error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: [],
                    error: error.stack
                },
                error.status
            )
        }
    }

    private async saveDate(userData: UserDto): Promise<ApiBaseResponse<UserDto>> {
        try {
            const addressString = [
                userData.address.street,
                userData.address.suite,
                userData.address.city,
                userData.address.zipcode,
                userData.address.geo.lat,
                userData.address.geo.lng
            ].filter(Boolean).join(';');

            const companyString = [
                userData.company.name,
                userData.company.catchPhrase,
                userData.company.bs
            ].filter(Boolean).join(';');

            const user = await this.prisma.user.upsert({
                where: { id: userData.id },
                update: {
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    phone: userData.phone,
                    website: userData.website,
                    address: addressString,
                    company: companyString,
                },
                create: {
                    id: userData.id,
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    phone: userData.phone,
                    website: userData.website,
                    address: addressString,
                    company: companyString,
                },
            });

            return {
                success: true,
                statusCode: 200,
                message: 'Success save user',
            };

        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: [],
                    error: error.stack
                },
                error.status
            )
        }
    }

}
