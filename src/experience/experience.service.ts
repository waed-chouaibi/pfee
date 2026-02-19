import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience) private experienceRepository:Repository<Experience>
  ){}
  async create(createExperienceDto: CreateExperienceDto):Promise <Experience> {
    const newExperience =await this.experienceRepository.create(createExperienceDto)
    return this.experienceRepository.save(newExperience)
  }

  async findAll():Promise <Experience[]> {
    const experience=await this.experienceRepository.find()
        if(experience.length==0){
          throw new NotFoundException("data not found")
        }
        return experience
  }

  async findOne(id: number):Promise <Experience> {
    const experience=await this.experienceRepository.findOneBy({id})
    if(!experience){
      throw new NotFoundException("not found")
    }
    return experience
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto): Promise <Experience> {
     const updateExperience=await this.experienceRepository.preload({...updateExperienceDto,id})
     if(!updateExperience){
      throw new NotFoundException(`can not update a #${id}`)
    }
    return this.experienceRepository.save(updateExperience)
  }

  async remove(id: number) {
    const user=await this.experienceRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException("not found")
    }
    await this.experienceRepository.delete(id)
    return id
  }
  
}
