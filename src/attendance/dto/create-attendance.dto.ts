import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendanceDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

}
