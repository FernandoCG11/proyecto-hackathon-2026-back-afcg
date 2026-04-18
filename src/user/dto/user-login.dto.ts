import { IsEmail, MinLength } from "class-validator";

export class UserLoginDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}