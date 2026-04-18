import { Injectable } from '@nestjs/common';
import { CreateTaxProfileDto } from './dto/create-tax-profile.dto';
import { UpdateTaxProfileDto } from './dto/update-tax-profile.dto';

@Injectable()
export class TaxProfileService {
  create(createTaxProfileDto: CreateTaxProfileDto) {
    return 'This action adds a new taxProfile';
  }

  findAll() {
    return `This action returns all taxProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxProfile`;
  }

  update(id: number, updateTaxProfileDto: UpdateTaxProfileDto) {
    return `This action updates a #${id} taxProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxProfile`;
  }
}
