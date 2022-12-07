import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";

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
    @ManyToOne(() => User, user => user.cvs, { eager: true, cascade: true })
    user: User;

    @JoinTable()
    @ManyToOne(() => Skill, skill => skill.cvs, { eager: true, cascade: true })
    skills: Skill[];

}
