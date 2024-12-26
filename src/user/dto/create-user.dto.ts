import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username : string;

    @IsString()
    @IsNotEmpty()
    password : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsInt()
    @IsNotEmpty()
    age : number; 

    @IsArray()
    @IsString({ each: true }) // Validate that each item in the array is a string
    @IsNotEmpty()
    role : string[];
    
}
