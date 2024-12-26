import { IsArray, IsDateString, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    adminname : string;

    @IsString()
    @IsNotEmpty()
    password : string

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsInt()
    @IsNotEmpty()
    age : number; 

    @IsArray()
    @IsString({ each: true }) // Validate that each item in the array is a string
    @IsNotEmpty()
    role : string[];

    @IsArray()
    @IsString({ each: true }) // Validate that each item in the array is a string
    @IsNotEmpty()
    permisssions : string[];       //['manage_users', 'view_reports']

    @IsDateString()
    @IsNotEmpty()
    lastLogin: Date; // T
}
