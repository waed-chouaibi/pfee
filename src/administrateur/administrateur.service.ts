import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrateur } from './entities/administrateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministrateurService {
  constructor(
    @InjectRepository(Administrateur) private administrateurRepository:Repository<Administrateur>
  ){}
  async create(createAdministrateurDto: CreateAdministrateurDto):Promise <Administrateur> {
    const newadmin =await this.administrateurRepository.create({...createAdministrateurDto, role:"administrateur"})
    return this.administrateurRepository.save(newadmin)
  }

  async findAll():Promise <Administrateur[]> {
    const admin=await this.administrateurRepository.find()
        if(admin.length==0){
          throw new NotFoundException("data not found")
        }
        return admin
  }

  async findOne(id: number):Promise <Administrateur> {
    const admin=await this.administrateurRepository.findOneBy({id})
  if(!admin){
    throw new NotFoundException("error not found")
  }
  return admin
  }

  async update(id: number, updateAdministrateurDto: UpdateAdministrateurDto):Promise <Administrateur> {
    const updateAdmin=await this.administrateurRepository.preload({...updateAdministrateurDto,id})
  if(!updateAdmin){
    throw new NotFoundException(`can not update a #${id} `)
  }
  return this.administrateurRepository.save(updateAdmin)
  }

  async remove(id: number) {
    const admin=await this.administrateurRepository.findOneBy({id})
  if(!admin){
    throw new NotFoundException("error not found")
  }
  await this.administrateurRepository.delete(id)
  return id
  }
}
