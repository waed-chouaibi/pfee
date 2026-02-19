import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffreemploiDto } from './dto/create-offreemploi.dto';
import { UpdateOffreemploiDto } from './dto/update-offreemploi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offreemploi } from './entities/offreemploi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffreemploiService {
  constructor(
    @InjectRepository(Offreemploi) private offreemploiRepository:Repository<Offreemploi>
  ){}
  async create(createOffreemploiDto: CreateOffreemploiDto):Promise<Offreemploi> {
    const newoffre=await this.offreemploiRepository.create(createOffreemploiDto)
    return this.offreemploiRepository.save(newoffre)
    
  }

  async findAll():Promise <Offreemploi[]> {
    const offer=await this.offreemploiRepository.find()
    if(offer.length==0){
      throw new NotFoundException("data not found")
    }
    return offer
  }

  async findOne(id: number):Promise <Offreemploi> {
    const offer=await this.offreemploiRepository.findOneBy({id})
    if (!offer){
      throw new NotFoundException("error!")
    }
    return offer
  }

  async update(id: number, updateOffreemploiDto: UpdateOffreemploiDto):Promise <Offreemploi> {
    const offer=await this.offreemploiRepository.preload({...updateOffreemploiDto,id})
    if(!offer){
      throw new NotFoundException(`can not update a #${id} user`)
    }
  return this.offreemploiRepository.save(offer)
  }
  

  async remove(id: number) {
    const offer=await this.offreemploiRepository.findOneBy({id})
  if(!offer){
    throw new NotFoundException("user not found")
  }
  await this.offreemploiRepository.delete(id)
  return id
  
  }
}
