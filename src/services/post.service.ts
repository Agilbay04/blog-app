import { HttpException, Injectable, Logger, Req } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiBaseResponse } from 'src/dtos/responses/api.base.response';
import { PostMapper } from 'src/mappers/post.mapper';
import { PostDto } from 'src/dtos/responses/post.response.dto';
import { PostFormDto } from 'src/dtos/forms/post.form.dto';

@Injectable()
export class PostService {

    constructor(
        private prisma: PrismaService,
        private httpService: HttpService,
        private config: ConfigService
    ) { }

    async fetchPosts(): Promise<ApiBaseResponse<PostDto[]>> {
        let posts = new Array<PostDto>();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.get(`${apiUrl}/posts`));
            posts = response.data;

            return {
                success: true,
                statusCode: response.status,
                message: 'Posts fetched successfully',
                data: await posts,
            };

        } catch (error) {
            throw new HttpException (
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

    async getAllPost(): Promise<ApiBaseResponse<PostDto[]>> {
        try {
            const posts = (await this.prisma.post.findMany());
            const msg = posts.length === 0 ? 'Posts is empty' : 'Success get posts';

            return {
                success: true,
                statusCode: 200,
                message: msg,
                data: posts,
            };

        } catch (error) {
            throw new HttpException (
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

    async getOnePost(id: number): Promise<ApiBaseResponse<PostDto>> {
        let post = new PostDto();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.get(`${apiUrl}/posts/${id}`));
            post = PostMapper(response.data);

            return {
                success: true,
                statusCode: 200,
                message: 'Success get post',
                data: post,
            };

        } catch (error) {
            throw new HttpException (
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: post,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async createPost(idUser: number, postData: PostFormDto): Promise<ApiBaseResponse<PostDto>> {
        let post = new PostDto();
        try {
            postData.userId = idUser;
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.post(`${apiUrl}/posts`, postData));
            post = PostMapper(response.data);

            return {
                success: true,
                statusCode: response.status,
                message: 'Success create post',
                data: post,
            };

        } catch (error) {
            throw new HttpException (
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: post,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async putPost(id: number, postData: PostFormDto): Promise<ApiBaseResponse<PostDto>> {
        let post = new PostDto();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.put(`${apiUrl}/posts/${id}`, postData));
            post = PostMapper(response.data);

            return {
                success: true,
                statusCode: response.status,
                message: 'Success update post',
                data: post,
            };

        } catch (error) {
            throw new HttpException (
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: post,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async patchPost(id: number, postData: PostFormDto): Promise<ApiBaseResponse<PostDto>> {
        let post = new PostDto();
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.patch(`${apiUrl}/posts/${id}`, postData));
            post = PostMapper(response.data);

            return {
                success: true,
                statusCode: response.status,
                message: 'Success update post',
                data: post,
            };

        } catch (error) {
            throw new HttpException (
                {
                    success: false,
                    statusCode: error.status,
                    message: error.message,
                    data: post,
                    error: error.stack
                },
                error.status
            )
        }
    }

    async deletePost(id: number): Promise<ApiBaseResponse<void>> {
        try {
            const apiUrl = this.config.get<string>('apiUrl');
            const response = await firstValueFrom(this.httpService.delete(`${apiUrl}/posts/${id}`));

            return {
                success: true,
                statusCode: response.status,
                message: 'Success delete post',
            };

        } catch (error) {
            throw new HttpException (
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

    async syncPosts(): Promise<ApiBaseResponse<void>> {
        try {
            const posts = (await this.fetchPosts());
            const msg = posts.data.length === 0 ? 'Posts is empty, no data to save' : 'Success sync posts';

            for (const post of posts.data) {
                await this.saveData(post);
            }

            return {
                success: true,
                statusCode: 201,
                message: msg,
            };

        } catch (error) {
            throw new HttpException (
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

    private async saveData(postData: PostDto): Promise<ApiBaseResponse<PostDto>> {
        try {
            const post = await this.prisma.post.upsert({
                where: { id: postData.id },
                update: {
                    title: postData.title,
                    body: postData.body,
                    userId: postData.userId,
                },
                create: {
                    id: postData.id,
                    title: postData.title,
                    body: postData.body,
                    userId: postData.userId,
                }
            });

            return {
                success: true,
                statusCode: 200,
                message: 'Success save post',
                data: post,
            };

        } catch (error) {
            throw new HttpException (
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

}
