import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { response } from 'express';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto,@Res()response) {
    try{
          const newCv=await this.cvService.create(createCvDto)
          return response.status(HttpStatus.CREATED).json({
            message:"CV create avec succes",newCv
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation de CV"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res()response) {
    try{
      const cv=await this.cvService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all CVs",cv
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number ,@Res()response) {
    try{
      const cv=await this.cvService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this CV",cv
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCvDto: UpdateCvDto,@Res()response) {
    try{
      const cv=await this.cvService.update(id ,updateCvDto)
      return response.status(HttpStatus.OK).json({
        message:"CV update",cv
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
      const cv=await this.cvService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"cv remove",cv
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
