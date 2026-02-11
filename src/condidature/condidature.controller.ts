import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { CondidatureService } from './condidature.service';
import { CreateCondidatureDto } from './dto/create-condidature.dto';
import { UpdateCondidatureDto } from './dto/update-condidature.dto';
import { response } from 'express';

@Controller('condidature')
export class CondidatureController {
  constructor(private readonly condidatureService: CondidatureService) {}

  @Post()
  async create(@Body() createCondidatureDto: CreateCondidatureDto, @Res() response) {
    try{
          const newCondidature=await this.condidatureService.create(createCondidatureDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newCondidature
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation de l'utilisateur"+error.message
          })
        }
    
  }

  @Get()
  async findAll(@Res() response) {
    try{
      const condidature=await this.condidatureService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all users",condidature
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
      const condidature=await this.condidatureService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this user",condidature
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCondidatureDto: UpdateCondidatureDto,@Res()response) {
    try{
      const condidature=await this.condidatureService.update(id ,updateCondidatureDto)
      return response.status(HttpStatus.OK).json({
        message:"user update",condidature
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
      const condidature=await this.condidatureService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"condidature remove",condidature
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur: not found"+error.message
      })

    }
  }
}
