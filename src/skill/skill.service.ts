import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.save(createSkillDto);
  }

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: number) {
    return this.skillRepository.findOneBy({ id });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new Error(`Skill with id ${id} not found`);
    }
    this.skillRepository.merge(skill, updateSkillDto);
    return this.skillRepository.save(skill);
  }

  remove(id: number) {
    return this.skillRepository.delete(id);
  }
}
