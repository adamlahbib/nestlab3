import { Cv } from "./../../cv/entities/cv.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('skill')
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation: string;

    @ManyToMany(() => Cv, cv => cv.skills)
    cvs: Cv[];
}
