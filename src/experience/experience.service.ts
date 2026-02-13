import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience) private userRepository:Repository<Experience>
  ){}
  async create(createExperienceDto: CreateExperienceDto):Promise <Experience> {
    const newExperience =await this.userRepository.create(createExperienceDto)
    return this.userRepository.save(newExperience)
  }

  async findAll():Promise <Experience[]> {
    const experience=await this.userRepository.find()
        if(experience.length==0){
          throw new NotFoundException("data not found")
        }
        return experience
  }

  async findOne(id: number):Promise <Experience> {
    const experience=await this.userRepository.findOneBy({id})
    if(!experience){
      throw new NotFoundException("not found")
    }
    return experience
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto): Promise <Experience> {
     const updateExperience=await this.userRepository.preload({...updateExperienceDto,id})
     if(!updateExperience){
      throw new NotFoundException(`can not update a #${id}`)
    }
    return this.userRepository.save(updateExperience)
  }

  async remove(id: number) {
    const user=await this.userRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException("not found")
    }
    await this.userRepository.delete(id)
    return id
  }
  
}
