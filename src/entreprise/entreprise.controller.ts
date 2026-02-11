import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { response } from 'express';

@Controller('entreprise')
export class EntrepriseController {
  constructor(private readonly entrepriseService: EntrepriseService) {}

  @Post()
  async create(@Body() createEntrepriseDto: CreateEntrepriseDto , @Res() response ) {
     try{
      const newConversation=await this.entrepriseService.create(createEntrepriseDto)
      return response.status(HttpStatus.CREATED).json({
        message:"user create avec succes",newConversation
      })
    }catch (error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur lors de la creation de l'utilisateur"+error.message
      })
    }
  }

  @Get()
  async findAll() {
     try{
      const entreprise=await this.entrepriseService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all users",entreprise
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try{
      const entreprise=await this.entrepriseService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this user",entreprise
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateEntrepriseDto: UpdateEntrepriseDto,@Res() response) {
        try{
      const entreprise=await this.entrepriseService.update(id, updateEntrepriseDto)
      return response.status(HttpStatus.OK).json({
        message:"user update",entreprise
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"Erreur: not found"+error.message
      })

    }
    
  }

  @Delete(':id')
  async remove(@Param('id') id: number , @Res()response) {
    try{
      const entreprise=await this.entrepriseService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"user remove",entreprise
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"Erreur:not found"+error.message
      })

    }
  }
}
