import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private userRepository:Repository <Cv>
  ){}
  async create(createCvDto: CreateCvDto):Promise <Cv> {
    const newCv =await this.userRepository.create(createCvDto)
    return this.userRepository.save(newCv)
  }

  async findAll():Promise<Cv[]> {
    const cv=await this.userRepository.find()
        if(cv.length==0){
          throw new NotFoundException("data not found")
        }
        return cv
  }

  async findOne(id: number):Promise <Cv> {
    const cv=await this.userRepository.findOneBy({id})
    if(!cv){
      throw new NotFoundException("user not found")
    }
  return cv
  }

  async update(id: number, updateCvDto: UpdateCvDto):Promise<Cv> {
    const updateCv=await this.userRepository.preload({...updateCvDto,id})
    if(!updateCv){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.userRepository.save(updateCv)
  }

  async remove(id: number) {
    const cv=await this.userRepository.findOneBy({id})
    if(!cv){
      throw new NotFoundException("user not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
