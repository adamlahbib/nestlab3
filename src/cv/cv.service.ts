import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CvService {

  constructor (
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ){}

  create(createCvDto: CreateCvDto) {
    return this.cvRepository.save(createCvDto);
  }

  findAll() {
    return this.cvRepository.find();
  }

  findOne(id: number) {
    return this.cvRepository.findOneBy({id});
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    const cv = await this.cvRepository.findOneBy({id});
    if (!cv) {
      throw new Error(`Cv with id ${id} not found`);
    }
    this.cvRepository.merge(cv, updateCvDto);
    return this.cvRepository.save(cv);
  }

  remove(id: number) {
    return this.cvRepository.delete(id);
  }
}
