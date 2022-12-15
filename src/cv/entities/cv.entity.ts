import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./../../skill/entities/skill.entity";
import { User } from "./../../user/entities/user.entity";

@Entity('cv')
export class Cv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    occupation: string;

    @Column()
    path: string;

    @JoinTable()
    @ManyToOne(() => User, user => user.cvs, { cascade: true, eager: true })
    user: User;

    @JoinTable()
    @ManyToMany(() => Skill, skill => skill.cvs, { cascade: true, eager: true })
    skills: Skill[];

}
