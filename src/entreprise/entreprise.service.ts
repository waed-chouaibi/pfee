import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entreprise } from './entities/entreprise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntrepriseService {
  constructor(
    @InjectRepository(Entreprise) private entrepriseRepository:Repository<Entreprise>
  ){}
  async create(createEntrepriseDto: CreateEntrepriseDto):Promise<Entreprise> {
    const newEntreprise=await this.entrepriseRepository.create({...createEntrepriseDto,role:"entreprise"})
    return this.entrepriseRepository.save(newEntreprise)
  }

  async findAll():Promise <Entreprise[]> {
    const entreprise=await this.entrepriseRepository.find()
    if(entreprise.length==0){
      throw new NotFoundException("Error : Not found")
    }
    return entreprise
  }

  async findOne(id: number):Promise <Entreprise> {
    const entreprise=await this.entrepriseRepository.findOneBy({id})
    if(!entreprise){
      throw new NotFoundException("Error: not found")
  }
  return entreprise
  }

  async update(id: number, updateEntrepriseDto: UpdateEntrepriseDto) {
    const updateEntreprise=await this.entrepriseRepository.preload({...updateEntrepriseDto,id})
  if(!updateEntreprise){
    throw new NotFoundException(`can not update a #${id} user`)
  }
  return this.entrepriseRepository.save(updateEntreprise)
  }

  async remove(id: number) {
    const entreprise=await this.entrepriseRepository.findOneBy({id})
  if(!entreprise){
    throw new NotFoundException("Error: not found")
  }
  await this.entrepriseRepository.delete(id)
  return id
  }
}
