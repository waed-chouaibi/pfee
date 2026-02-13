import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(Certification) private userRepository:Repository<Certification>
  ){}
  async create(createCertificationDto: CreateCertificationDto):Promise <Certification> {
    const newCertification =await this.userRepository.create(createCertificationDto)
    return this.userRepository.save(newCertification)
  }

  async findAll():Promise <Certification[]> {
     const certification=await this.userRepository.find()
        if(certification.length==0){
          throw new NotFoundException("data not found")
        }
        return certification
  }

  async findOne(id: number):Promise<Certification> {
    const certification=await this.userRepository.findOneBy({id})
  if(!certification){
    throw new NotFoundException("user not found")
  }
  return certification
  }

  async update(id: number, updateCertificationDto: UpdateCertificationDto):Promise<Certification> {
    const updateCertification=await this.userRepository.preload({...updateCertificationDto,id})
    if(!updateCertification){
      throw new NotFoundException(`can not update a #${id}`)
    }
    return this.userRepository.save(updateCertification)
  }

  async remove(id: number) {
    const certification=await this.userRepository.findOneBy({id})
    if(!certification){
      throw new NotFoundException("not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
