import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { response } from 'express';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto,@Res()response) {
    try{
          const newExperience=await this.experienceService.create(createExperienceDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newExperience
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation:"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res()response) {
    try{
      const experience=await this.experienceService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all ",experience
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Res()response) {
    try{
      const experience=await this.experienceService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this user",experience
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
    
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateExperienceDto: UpdateExperienceDto,@Res()response) {
    try{
      const user=await this.experienceService.update(id ,updateExperienceDto)
      return response.status(HttpStatus.OK).json({
        message:"experience update",user
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res()response) {
    try{
      const user=await this.experienceService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"experience remove",user
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
