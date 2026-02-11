import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCondidatureDto } from './dto/create-condidature.dto';
import { UpdateCondidatureDto } from './dto/update-condidature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Condidature } from './entities/condidature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CondidatureService {
  constructor(
    @InjectRepository(Condidature) private userRepository:Repository<Condidature> 
  ){}
  async create(createCondidatureDto: CreateCondidatureDto):Promise <Condidature> {
    const newCondidature =await this.userRepository.create(createCondidatureDto)
    return this.userRepository.save(newCondidature)
  }

  async findAll():Promise <Condidature[]> {
    const condidature=await this.userRepository.find()
        if(condidature.length==0){
          throw new NotFoundException("data not found")
        }
        return condidature
  }

  async findOne(id: number):Promise<Condidature> {
    const condidature=await this.userRepository.findOneBy({id})
  if(!condidature){
    throw new NotFoundException("user not found")
  }
  return condidature
  }

  async update(id: number, updateCondidatureDto: UpdateCondidatureDto):Promise <Condidature> {
     const updateCondidature=await this.userRepository.preload({...updateCondidatureDto,id})
  if(!updateCondidature){
    throw new NotFoundException(`can not update a #${id} user`)
  }
  return this.userRepository.save(updateCondidature)
  }

  async remove(id: number) {
     const condidature=await this.userRepository.findOneBy({id})
     if(!condidature){
      throw new NotFoundException("user not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
