import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostFormDto {
    @ApiProperty({ type: String, example: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String, example: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto' })
    @IsNotEmpty()
    body: string;

    @ApiProperty({ type: Number, example: 1 })
    @IsNotEmpty()
    userId: number;
}