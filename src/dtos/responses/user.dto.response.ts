import { 
    IsEmail, 
    IsNotEmpty, 
    IsObject, 
    IsNotEmptyObject 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Address {
    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    suite: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zipcode: string;

    @IsObject()
    geo: {
        lat: string;
        lng: string;
    }
}

export class Company {
    name: string;

    catchPhrase: string;

    bs: string;
}

export class UserDto {
    @ApiProperty({ type: Number, example: 1 })
    id: number;

    @ApiProperty({ type: String, example: 'Leanne Graham' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: String, example: 'Bret' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: String, example: 'KXjzJ@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: Object, example: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-31.93083', lng: '221.983402' } } })
    @IsObject()
    @IsNotEmptyObject()
    address: Address;

    @ApiProperty({ type: String, example: '1-770-736-8031 x56442' })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ type: String, example: 'hildegard.org' })
    website: string;

    @ApiProperty({ type: Object, example: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' } })
    @IsObject()
    company: Company;
    
    @ApiProperty({ type: Date, example: new Date().toISOString() })
    createdAt?: Date;
    
    @ApiProperty({ type: Date, example: new Date().toISOString() })
    updatedAt?: Date;

    @ApiProperty({ type: Boolean, example: false })
    deleted?: boolean;
}