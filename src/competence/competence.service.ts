import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Competence } from './entities/competence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompetenceService {
  constructor(
    @InjectRepository(Competence) private userRepository:Repository<Competence>
  ){}
  async create(createCompetenceDto: CreateCompetenceDto):Promise <Competence> {
    const competence =await this.userRepository.create(createCompetenceDto)
    return this.userRepository.save(competence)
  }

  async findAll():Promise <Competence[]> {
    const competence=await this.userRepository.find()
        if(competence.length==0){
          throw new NotFoundException("data not found")
        }
        return competence
  }

  async findOne(id: number):Promise <Competence> {
    const competence=await this.userRepository.findOneBy({id})
     if(!competence){
      throw new NotFoundException("user not found")
    }
  return competence
  }

  async update(id: number, updateCompetenceDto: UpdateCompetenceDto):Promise <Competence> {
     const updateCompetence=await this.userRepository.preload({...updateCompetenceDto,id})
     if(!updateCompetence){
      throw new NotFoundException(`can not update a #${id} competence`)
    }
    return this.userRepository.save(updateCompetence)
  }

  async remove(id: number) {
    const competence=await this.userRepository.findOneBy({id})
    if(!competence){
      throw new NotFoundException(" not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
