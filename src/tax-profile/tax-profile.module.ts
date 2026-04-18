import { Module } from '@nestjs/common';
import { TaxProfileService } from './tax-profile.service';
import { TaxProfileController } from './tax-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxProfile, TaxProfileSchema } from 'src/mongo-db/schemas/tax-profile.schema';
import { User, UserSchema } from 'src/mongo-db/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaxProfile.name, schema: TaxProfileSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [TaxProfileController],
  providers: [TaxProfileService],
})
export class TaxProfileModule { }
