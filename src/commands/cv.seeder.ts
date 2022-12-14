import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { Cv } from "../cv/entities/cv.entity";
import { User } from "../user/entities/user.entity";
import { Skill } from "../skill/entities/skill.entity";
import { CvService } from "../cv/cv.service";
import { UserService } from "../user/user.service";
import { SkillService } from "../skill/skill.service";
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
        user.id = i;
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
        cv.user = users[Math.floor(Math.random() * users.length)];
        // use 5 random skills
        // make a new array of skills for cv.skill
        const sk = [];
        for (let j = 0; j < 5; j++) {
            sk.push(skills[Math.floor(Math.random() * skills.length)]);
        }
        cv.skills=sk;

        console.log(cv);
        
        await cvService.create(cv);

    }
}

bootstrap();