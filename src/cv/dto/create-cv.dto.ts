import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from "../../user/entities/user.entity";

export class CreateCvDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    path: string;

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
    user: User;

    @IsNotEmpty()
    skills: Skill[];
}