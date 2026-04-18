import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
} from '@nestjs/common';

import { TaxProfileService } from './tax-profile.service';
import { CreateTaxProfileDto } from './dto/create-tax-profile.dto';
import { UpdateTaxProfileDto } from './dto/update-tax-profile.dto';

@Controller()
export class TaxProfileController {
  constructor(private readonly taxProfileService: TaxProfileService) { }

  @Post('users/:userId/tax-profile')
  create(
    @Param('userId') userId: string,
    @Body() createDto: CreateTaxProfileDto,
  ) {
    return this.taxProfileService.create(userId, createDto);
  }

  @Get('users/:userId/tax-profile')
  findByUser(@Param('userId') userId: string) {
    return this.taxProfileService.findByUser(userId);
  }

  @Patch('users/:userId/tax-profile')
  update(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateTaxProfileDto,
  ) {
    return this.taxProfileService.updateByUser(userId, updateDto);
  }
}
