import { IsInt, IsString, IsNotEmpty } from "class-validator";
export class CreateCatDTO {

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsInt()
    @IsNotEmpty()
    age : number;

    @IsString()
    @IsNotEmpty()
    breed : string;

    @IsString()
    @IsNotEmpty()
    color : string;

}