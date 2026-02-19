import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private cvRepository:Repository <Cv>
  ){}
  async create(createCvDto: CreateCvDto):Promise <Cv> {
    const newCv =await this.cvRepository.create(createCvDto)
    return this.cvRepository.save(newCv)
  }

  async findAll():Promise<Cv[]> {
    const cv=await this.cvRepository.find()
        if(cv.length==0){
          throw new NotFoundException("data not found")
        }
        return cv
  }

  async findOne(id: number):Promise <Cv> {
    const cv=await this.cvRepository.findOneBy({id})
    if(!cv){
      throw new NotFoundException("user not found")
    }
  return cv
  }

  async update(id: number, updateCvDto: UpdateCvDto):Promise<Cv> {
    const updateCv=await this.cvRepository.preload({...updateCvDto,id})
    if(!updateCv){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.cvRepository.save(updateCv)
  }

  async remove(id: number) {
    const cv=await this.cvRepository.findOneBy({id})
    if(!cv){
      throw new NotFoundException("user not found")
    }
    await this.cvRepository.delete(id)
    return id
  }
}
