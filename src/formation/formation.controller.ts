import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { response } from 'express';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  async create(@Body() createFormationDto: CreateFormationDto,@Res()response) {
    try{
          const newFormation=await this.formationService.create(createFormationDto)
          return response.status(HttpStatus.CREATED).json({
            message:"formation create avec succes",newFormation
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation de l'utilisateur"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res()response) {
    try{
      const formation=await this.formationService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all users",formation
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
      const formation=await this.formationService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this :",formation
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateFormationDto: UpdateFormationDto,@Res()response) {
    try{
      const formation=await this.formationService.update(id ,updateFormationDto)
      return response.status(HttpStatus.OK).json({
        message:" update",formation
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try{
      const formation=await this.formationService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"remove",formation
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
