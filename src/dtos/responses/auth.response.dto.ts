import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {

    @ApiProperty({ type: String, example: 'Bret' })
    username: string;

    @ApiProperty({ type: String, example: '12321INoafhaofiepourwptuwenoaskmlalcmalmc' })
    token: string;
    
}