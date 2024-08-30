import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
    @ApiProperty({ type: Number, example: 1 })
    id: number;

    @ApiProperty({ type: String, example: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String, example: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto' })
    @IsNotEmpty()
    body: string;

    @ApiProperty({ type: Number, example: 1 })
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ type: Date, example: new Date().toISOString() })
    createdAt?: Date;
    
    @ApiProperty({ type: Date, example: new Date().toISOString() })
    updatedAt?: Date;
    
    @ApiProperty({ type: Boolean, example: false })
    deleted?: boolean;
}