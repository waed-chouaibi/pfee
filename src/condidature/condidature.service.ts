import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCondidatureDto } from './dto/create-condidature.dto';
import { UpdateCondidatureDto } from './dto/update-condidature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Condidature } from './entities/condidature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CondidatureService {
  constructor(
    @InjectRepository(Condidature) private candidatureRepository:Repository<Condidature> 
  ){}
  async create(createCondidatureDto: CreateCondidatureDto):Promise <Condidature> {
    const newCondidature =await this.candidatureRepository.create(createCondidatureDto)
    return this.candidatureRepository.save(newCondidature)
  }

  async findAll():Promise <Condidature[]> {
    const condidature=await this.candidatureRepository.find()
        if(condidature.length==0){
          throw new NotFoundException("data not found")
        }
        return condidature
  }

  async findOne(id: number):Promise<Condidature> {
    const condidature=await this.candidatureRepository.findOneBy({id})
  if(!condidature){
    throw new NotFoundException("user not found")
  }
  return condidature
  }

  async update(id: number, updateCondidatureDto: UpdateCondidatureDto):Promise <Condidature> {
     const updateCondidature=await this.candidatureRepository.preload({...updateCondidatureDto,id})
  if(!updateCondidature){
    throw new NotFoundException(`can not update a #${id} user`)
  }
  return this.candidatureRepository.save(updateCondidature)
  }

  async remove(id: number) {
     const condidature=await this.candidatureRepository.findOneBy({id})
     if(!condidature){
      throw new NotFoundException("user not found")
    }
    await this.candidatureRepository.delete(id)
    return id
  }
}
