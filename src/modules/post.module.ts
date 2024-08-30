import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostController } from 'src/controllers/post.controller';
import { PostService } from 'src/services/post.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
    imports: [HttpModule],
    controllers: [PostController],
    providers: [PostService, PrismaService],
})
export class PostModule {}
