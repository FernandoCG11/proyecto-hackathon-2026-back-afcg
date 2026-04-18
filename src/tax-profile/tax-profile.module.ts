import { Module } from '@nestjs/common';
import { TaxProfileService } from './tax-profile.service';
import { TaxProfileController } from './tax-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxProfile, TaxProfileSchema } from 'src/mongo-db/schemas/tax-profile.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaxProfile.name, schema: TaxProfileSchema }
  ])],
  controllers: [TaxProfileController],
  providers: [TaxProfileService],
})
export class TaxProfileModule { }
