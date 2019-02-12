import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('branch')
export class BranchController {
    @Post()
    create(@Body() createBranchDTO) {
      return 'This action adds a new cat';
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
