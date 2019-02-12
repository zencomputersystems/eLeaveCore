import { Controller, Post, Body, Get, Query, Param, Put, Delete } from '@nestjs/common';
import { CreateCostCentreDto } from './dto/create-costcentre.dto';

@Controller('/api/admin/costcentre')
export class CostcentreController {

    @Post()
    create(@Body() createCostCentre: CreateCostCentreDto) {
        return createCostCentre;
    }
  
    @Get()
    findAll() {
      return 'This is Get CostCentre';
    }
  
    @Get(':id')
    findOne(@Param('id') id) {
      return `This action returns a #${id} cat`;
    }
    
}
