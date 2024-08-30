import { PostDto } from 'src/dtos/responses/post.response.dto';

export const PostMapper = (post: any): PostDto => {
    return {
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId
    }
}