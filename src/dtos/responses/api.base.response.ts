import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApiBaseResponse<T> {
    @ApiProperty()
    @IsNotEmpty()
    success: boolean;

    @ApiProperty()
    @IsNotEmpty()
    statusCode: number;

    @ApiProperty()
    @IsNotEmpty()
    message: string;
    
    @ApiProperty()
    @IsArray()
    data?: T;

    @ApiProperty()
    error?: string;
}