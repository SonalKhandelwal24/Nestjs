import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateWebhookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsEmail()
  email: string;
}
