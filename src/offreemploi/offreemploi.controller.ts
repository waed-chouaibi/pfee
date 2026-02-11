import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { OffreemploiService } from './offreemploi.service';
import { CreateOffreemploiDto } from './dto/create-offreemploi.dto';
import { UpdateOffreemploiDto } from './dto/update-offreemploi.dto';
import { response } from 'express';

@Controller('offreemploi')
export class OffreemploiController {
  constructor(private readonly offreemploiService: OffreemploiService) {}

  @Post()
  async create(@Body() createOffreemploiDto: CreateOffreemploiDto ,@Res()response) {
    try{
          const newoffer=await this.offreemploiService.create(createOffreemploiDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newoffer
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res() response) {
    try{
      const offer=await this.offreemploiService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all offers",offer
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id:number,@Res()response) {
    try{
      const offer=await this.offreemploiService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this offers",offer
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateOffreemploiDto: UpdateOffreemploiDto,@Res()response) {
    try{
      const offer=await this.offreemploiService.update(id ,updateOffreemploiDto)
      return response.status(HttpStatus.OK).json({
        message:"offer update",offer
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
      const offer=await this.offreemploiService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"offer remove",offer
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
