import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Patch, 
    Delete, 
    Param, 
    Body, 
    UseGuards,
    Req
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostDto } from 'src/dtos/responses/post.response.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { 
    ApiOkResponse, 
    ApiBadRequestResponse,
    ApiNotFoundResponse, 
    ApiInternalServerErrorResponse, 
    ApiParam, 
    ApiBody, 
    ApiCreatedResponse,
    ApiTags,
    ApiOperation,
    ApiUnauthorizedResponse,
    ApiBearerAuth
} from '@nestjs/swagger';
import { PostFormDto } from 'src/dtos/forms/post.form.dto';
import { ApiBaseResponse } from 'src/dtos/responses/api.base.response';
import { request } from 'express';

@Controller('post')
@ApiBearerAuth()
@ApiTags('Post Collection')
export class PostController {
    constructor(private readonly postService: PostService) {}
    
    @Get('fetch')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Fetch posts data from api jsonplaceholder.typicode.com' })
    @ApiOkResponse({ type: ApiBaseResponse<PostDto[]>, status: 200, description: 'Success fetch posts' })
    @ApiBadRequestResponse({ status: 400, description: 'Failed to fetch posts' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Unexpected error' })
    async fetchPosts(): Promise<ApiBaseResponse<PostDto[]>> {
        return await this.postService.fetchPosts();
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get posts data from database' })
    @ApiOkResponse({ type: ApiBaseResponse<PostDto>, status: 200, description: 'Success get posts' })
    @ApiBadRequestResponse({ status: 400, description: 'Failed to get posts' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Unexpected error' })
    async getAllPost(): Promise<ApiBaseResponse<PostDto[]>> {
        return await this.postService.getAllPost();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get post data from jsonplaceholder.typicode.com by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: ApiBaseResponse<PostDto>, status: 200, description: 'Success get post' })
    @ApiBadRequestResponse({ status: 400, description: 'Failed to get post' })
    @ApiNotFoundResponse({ status: 404, description: 'Post not found' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Unexpected error' })
    async getOnePost(@Param('id') id: number): Promise<ApiBaseResponse<PostDto>> {
        return await this.postService.getOnePost(id);
    }

    @Post('sync')
    @ApiOperation({ summary: 'Get posts data from api jsonplaceholder.typicode.com and save to database' })
    @ApiCreatedResponse({ type: ApiBaseResponse, status: 201, description: 'Success sync posts' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    async syncPosts() {
        return await this.postService.syncPosts();
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create post data to jsonplaceholder.typicode.com' })
    @ApiBody({ type: PostFormDto })
    @ApiCreatedResponse({ type: ApiBaseResponse<PostDto>, status: 201, description: 'Success create post' })
    @ApiBadRequestResponse({ status: 400, description: 'Failed to create post' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Unexpected error' })
    async createPost(@Req() request: Request, @Body() postData: PostFormDto) {
        const idUser = request['user'].id;
        return await this.postService.createPost(idUser, postData);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update post data from jsonplaceholder.typicode.com by id using put method' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: PostFormDto })
    @ApiOkResponse({ type: ApiBaseResponse<PostDto>, status: 200, description: 'Success update post' })
    @ApiBadRequestResponse({ status: 400, description: 'Failed to update post' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Unexpected error' })
    async putPost(@Param('id') id: number, @Body() postData: PostFormDto) {
        return await this.postService.putPost(id, postData);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update post data from jsonplaceholder.typicode.com by id using patch method' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: PostFormDto })
    @ApiOkResponse({ type: ApiBaseResponse<PostDto>, status: 200, description: 'Success update post' })
    @ApiBadRequestResponse({ status: 400, description: 'Failed to update post' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Unexpected error' })
    async patchPost(@Param('id') id: number, @Body() postData: PostFormDto) {
        return await this.postService.patchPost(id, postData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Delete post data from jsonplaceholder.typicode.com by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({ type: ApiBaseResponse<PostDto>, status: 200, description: 'Success delete post' })
    @ApiBadRequestResponse({ status: 400, description: 'Failed to delete post' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Unexpected error' })
    async deletePost(@Param('id') id: number) {
        return await this.postService.deletePost(id);
    }
}
