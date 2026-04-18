import { IsEmail, IsNotEmpty, IsDateString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsDateString()
    birth_date: Date;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}
