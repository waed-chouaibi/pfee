import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidat } from './entities/candidat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidatService {
  constructor(
    @InjectRepository(Candidat) private userRepository:Repository<Candidat>
  ){}
  async create(createCandidatDto: CreateCandidatDto):Promise <Candidat> {
    const newCandidat =await this.userRepository.create(createCandidatDto)
    return this.userRepository.save(newCandidat)
  }

  async findAll():Promise <Candidat[]> {
     const candidat=await this.userRepository.find()
        if(candidat.length==0){
          throw new NotFoundException("data not found")
        }
        return candidat
  }

  async findOne(id: number):Promise <Candidat> {
    const candidat=await this.userRepository.findOneBy({id})
  if(!candidat){
    throw new NotFoundException("user not found")
  }
  return candidat
  }

  async update(id: number, updateCandidatDto: UpdateCandidatDto):Promise <Candidat> {
    const updateCandidat=await this.userRepository.preload({...updateCandidatDto,id})
    if(!updateCandidat){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.userRepository.save(updateCandidat)
  }

  async remove(id: number) {
    const candidat=await this.userRepository.findOneBy({id})
    if(!candidat){
      throw new NotFoundException("user not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
