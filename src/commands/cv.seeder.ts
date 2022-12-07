import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { Cv } from "src/cv/entities/cv.entity";
import { User } from "src/user/entities/user.entity";
import { Skill } from "src/skill/entities/skill.entity";
import { CvService } from "src/cv/cv.service";
import { UserService } from "src/user/user.service";
import { SkillService } from "src/skill/skill.service";
import { randFirstName, randLastName, randUserName, randEmail, randPassword, randJobTitle, randNumber, randFilePath, randSkill } from "@ngneat/falso"

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const cvService = app.get(CvService);
    const userService = app.get(UserService);
    const skillService = app.get(SkillService);
    
    // generate some skills and some users

    for (let i = 0; i < 100; i++) {
        const user = new User();
        user.username = randUserName();
        user.email = randEmail();
        user.password = randPassword();
        await userService.create(user);
    }

    for (let i = 0; i < 100; i++) {
        const skill = new Skill();
        skill.designation = randSkill();
        await skillService.create(skill);
    }

    // generate some cvs

    const users = await userService.findAll();
    const skills = await skillService.findAll();
    
    for (let i = 0; i < 100; i++) {
        const cv = new Cv();
        cv.name = randLastName();
        cv.firstname = randFirstName();
        cv.age = randNumber({min: 18, max: 70});
        cv.cin = randNumber({min: 10000000, max: 99999999});
        cv.occupation = randJobTitle();
        cv.path = randFilePath();
        // use a random user
        cv.user.id = Number(users[Math.floor(Math.random() * users.length)]);
        // use 5 random skills
        for (let j = 0; j < 5; j++) {
            cv.skills.push(skills[Math.floor(Math.random() * skills.length)]);
        }

        await cvService.create(cv);
    }


}