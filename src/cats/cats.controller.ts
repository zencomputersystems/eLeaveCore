import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
    @Post()
    create(@Body() createCatDto: CreateCatDto) {
      return 'This action adds a new cat';
    }
  
    @Get()
    findAll(@Query() query) {
      return `This action returns all cats (limit: ${query.limit} items)`;
    }
  
    @Get(':id')
    findOne(@Param('id') id) {
      return `This action returns a #${id} cat`;
    }
  
    @Put(':id')
    update(@Param('id') id, @Body() updateCatDto) {
      return `This action updates a #${id} cat`;
    }
  
    @Delete(':id')
    remove(@Param('id') id) {
      return `This action removes a #${id} cat`;
    }
}