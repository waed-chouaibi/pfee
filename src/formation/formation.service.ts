import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Formation } from './entities/formation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Formation) private userRepository:Repository <Formation> 
  ){}
  async create(createFormationDto: CreateFormationDto):Promise <Formation> {
    const newFormation =await this.userRepository.create(createFormationDto)
    return this.userRepository.save(newFormation)
  }

  async findAll():Promise <Formation[]> {
    const formation=await this.userRepository.find()
        if(formation.length==0){
          throw new NotFoundException("data not found")
        }
        return formation
  }

  async findOne(id: number):Promise <Formation> {
    const formation=await this.userRepository.findOneBy({id})
    if(!formation){
      throw new NotFoundException("user not found")
    }
    return formation
  }

  async update(id: number, updateFormationDto: UpdateFormationDto):Promise <Formation> {
    const updateFormation=await this.userRepository.preload({...updateFormationDto,id})
    if(!updateFormation){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.userRepository.save(updateFormation)
  }

  async remove(id: number) {
    const formation=await this.userRepository.findOneBy({id})
    if(!formation){
      throw new NotFoundException("not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
