import { 
    IsNotEmpty,
    MinLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthFormDto {

    @ApiProperty({ type: String, example: 'Bret' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: String, example: '12345678' })
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}