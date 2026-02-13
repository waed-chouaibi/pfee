import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrateur } from './entities/administrateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministrateurService {
  constructor(
    @InjectRepository(Administrateur) private userRepository:Repository<Administrateur>
  ){}
  async create(createAdministrateurDto: CreateAdministrateurDto):Promise <Administrateur> {
    const newadmin =await this.userRepository.create({...createAdministrateurDto, role:"administrateur"})
    return this.userRepository.save(newadmin)
  }

  async findAll():Promise <Administrateur[]> {
    const admin=await this.userRepository.find()
        if(admin.length==0){
          throw new NotFoundException("data not found")
        }
        return admin
  }

  async findOne(id: number):Promise <Administrateur> {
    const admin=await this.userRepository.findOneBy({id})
  if(!admin){
    throw new NotFoundException("error not found")
  }
  return admin
  }

  async update(id: number, updateAdministrateurDto: UpdateAdministrateurDto):Promise <Administrateur> {
    const updateAdmin=await this.userRepository.preload({...updateAdministrateurDto,id})
  if(!updateAdmin){
    throw new NotFoundException(`can not update a #${id} `)
  }
  return this.userRepository.save(updateAdmin)
  }

  async remove(id: number) {
    const admin=await this.userRepository.findOneBy({id})
  if(!admin){
    throw new NotFoundException("error not found")
  }
  await this.userRepository.delete(id)
  return id
  }
}
