import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { CvModule } from './cv/cv.module';
import { Cv } from './cv/entities/cv.entity';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';

@Module({
  imports: [CvModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Cv]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Skill]),
    UserModule,
    SkillModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
