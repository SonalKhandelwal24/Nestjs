import { IsArray, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString,  } from "class-validator";

export class CreateManagerDto {

    @IsString()
    @IsNotEmpty()
    managername : string;

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

    @IsString()
    @IsNotEmpty()
    department : string;

    @IsInt()
    @IsNotEmpty()
    teamSize: number; 

}
