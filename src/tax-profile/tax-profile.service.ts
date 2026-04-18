import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTaxProfileDto } from './dto/create-tax-profile.dto';
import { UpdateTaxProfileDto } from './dto/update-tax-profile.dto';
import { TaxProfile, TaxProfileDocument } from 'src/mongo-db/schemas/tax-profile.schema';
import { User, UserDocument } from 'src/mongo-db/schemas/user.schema';

@Injectable()
export class TaxProfileService {
  constructor(
    @InjectModel(TaxProfile.name)
    private readonly taxProfileModel: Model<TaxProfileDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) { }
  async create(
    userId: string,
    createDto: CreateTaxProfileDto,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingProfile = await this.taxProfileModel.findOne({
      user_id: userId,
    });

    if (existingProfile) {
      throw new BadRequestException(
        'Tax profile already exists for this user',
      );
    }

    const taxProfile = await this.taxProfileModel.create({
      ...createDto,
      user_id: userId,
      last_regimen_update: new Date(),
    });

    return {
      taxProfileId: taxProfile.id,
      userId: userId,
    };
  }
  // 🔍 GET por userId
  async findByUser(userId: string): Promise<TaxProfile> {
    const profile = await this.taxProfileModel.findOne({
      user_id: userId,
    });

    if (!profile) {
      throw new NotFoundException('Tax profile not found for this user');
    }

    return profile;
  }

  // 🔄 UPDATE por userId
  async updateByUser(
    userId: string,
    updateDto: UpdateTaxProfileDto,
  ): Promise<TaxProfile> {
    const updated = await this.taxProfileModel.findOneAndUpdate(
      { user_id: userId },
      {
        ...updateDto,
        last_regimen_update: new Date(),
      },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Tax profile not found for this user');
    }

    return updated;
  }
}
