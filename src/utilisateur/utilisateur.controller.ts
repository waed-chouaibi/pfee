import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { response } from 'express';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  async create(@Body() createUtilisateurDto: CreateUtilisateurDto,@Res() response) {
    try{
      const newuser=await this.utilisateurService.create(createUtilisateurDto)
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
  async findAll(@Res()response) {
    try{
      const user=await this.utilisateurService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all users",user
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
      const user=await this.utilisateurService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this user",user
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUtilisateurDto: UpdateUtilisateurDto , @Res()response) {
    try{
      const user=await this.utilisateurService.update(id ,updateUtilisateurDto)
      return response.status(HttpStatus.OK).json({
        message:"user update",user
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
    
  }

  @Delete(':id')
  async remove(@Param('id') id: number ,@Res()response) {
    try{
      const user=await this.utilisateurService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"user remove",user
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
    
  }
}
