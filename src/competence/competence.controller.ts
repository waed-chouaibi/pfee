import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { response } from 'express';
import { Competence } from './entities/competence.entity';

@Controller('competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  @Post()
  async create(@Body() createCompetenceDto: CreateCompetenceDto,@Res()response) {
    try{
          const newuser=await this.competenceService.create(createCompetenceDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newuser
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation de l'utilisateur"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res()response):Promise <Competence> {
    try{
      const competence=await this.competenceService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all :",competence
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
      const competence=await this.competenceService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this competence",competence
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCompetenceDto: UpdateCompetenceDto,@Res()response) {
     try{
      const user=await this.competenceService.update(id ,updateCompetenceDto)
      return response.status(HttpStatus.OK).json({
        message:"competence update",user
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
      const user=await this.competenceService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"competence remove",user
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
