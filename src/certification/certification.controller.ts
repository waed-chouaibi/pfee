import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { response } from 'express';

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Post()
  async create(@Body() createCertificationDto: CreateCertificationDto,@Res()response) {
    try{
          const newCertification=await this.certificationService.create(createCertificationDto)
          return response.status(HttpStatus.CREATED).json({
            message:"create avec succes",newCertification
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res()response) {
    try{
      const certification=await this.certificationService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all :",certification
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res()response) {
    try{
      const certification=await this.certificationService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this :",certification
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCertificationDto: UpdateCertificationDto,@Res()response) {
    try{
      const certification=await this.certificationService.update(id ,updateCertificationDto)
      return response.status(HttpStatus.OK).json({
        message:"user update",certification
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
      const certification=await this.certificationService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"user remove",certification
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
