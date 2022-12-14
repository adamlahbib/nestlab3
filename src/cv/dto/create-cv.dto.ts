import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from "../../user/entities/user.entity";

export class CreateCvDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    path: string;

    @IsString()
    @IsNotEmpty()
    occupation: string;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(8)
    @MaxLength(8)
    cin: number;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(2)
    @MaxLength(2)
    age: number;

    @IsNotEmpty()
    @IsNumber()
    user: User;

    @IsArray()
    @IsNotEmpty()
    skills: Skill[];
}