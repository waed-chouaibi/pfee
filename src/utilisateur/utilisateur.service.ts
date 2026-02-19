import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur) private utilisateurRepository:Repository<Utilisateur>
  ){}
  async create(createUtilisateurDto: CreateUtilisateurDto):Promise <Utilisateur> {
    const newutilisateur =await this.utilisateurRepository.create(createUtilisateurDto)
    return this.utilisateurRepository.save(newutilisateur)
  }

  async findAll() : Promise <Utilisateur[]>{
    const user=await this.utilisateurRepository.find()
    if(user.length==0){
      throw new NotFoundException("data not found")
    }
    return user
  }

 async findOne(id: number):Promise <Utilisateur> {
  const user=await this.utilisateurRepository.findOneBy({id})
  if(!user){
    throw new NotFoundException("user not found")
  }
  return user
  }

  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto):Promise<Utilisateur> {
    const updateuser=await this.utilisateurRepository.preload({...updateUtilisateurDto,id})
    if(!updateuser){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.utilisateurRepository.save(updateuser)
  }

  async remove(id: number){
    const user=await this.utilisateurRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException("user not found")
    }
    await this.utilisateurRepository.delete(id)
    return id
  }
}
