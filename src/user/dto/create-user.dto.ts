import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MinLength, minLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, { message: "Passowrd must conatin at least one number" })
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

}
