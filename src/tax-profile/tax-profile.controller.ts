import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxProfileService } from './tax-profile.service';
import { CreateTaxProfileDto } from './dto/create-tax-profile.dto';
import { UpdateTaxProfileDto } from './dto/update-tax-profile.dto';

@Controller('tax-profile')
export class TaxProfileController {
  constructor(private readonly taxProfileService: TaxProfileService) {}

  @Post()
  create(@Body() createTaxProfileDto: CreateTaxProfileDto) {
    return this.taxProfileService.create(createTaxProfileDto);
  }

  @Get()
  findAll() {
    return this.taxProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxProfileDto: UpdateTaxProfileDto) {
    return this.taxProfileService.update(+id, updateTaxProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxProfileService.remove(+id);
  }
}
