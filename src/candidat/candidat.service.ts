import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidat } from './entities/candidat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidatService {
  constructor(
    @InjectRepository(Candidat) private candidatRepository:Repository<Candidat>
  ){}
  async create(createCandidatDto: CreateCandidatDto):Promise <Candidat> {
    const newCandidat =await this.candidatRepository.create(createCandidatDto)
    return this.candidatRepository.save(newCandidat)
  }

  async findAll():Promise <Candidat[]> {
     const candidat=await this.candidatRepository.find()
        if(candidat.length==0){
          throw new NotFoundException("data not found")
        }
        return candidat
  }

  async findOne(id: number):Promise <Candidat> {
    const candidat=await this.candidatRepository.findOneBy({id})
  if(!candidat){
    throw new NotFoundException("user not found")
  }
  return candidat
  }

  async update(id: number, updateCandidatDto: UpdateCandidatDto):Promise <Candidat> {
    const updateCandidat=await this.candidatRepository.preload({...updateCandidatDto,id})
    if(!updateCandidat){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.candidatRepository.save(updateCandidat)
  }

  async remove(id: number) {
    const candidat=await this.candidatRepository.findOneBy({id})
    if(!candidat){
      throw new NotFoundException("user not found")
    }
    await this.candidatRepository.delete(id)
    return id
  }
}
