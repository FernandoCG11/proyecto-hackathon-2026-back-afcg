import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/mongo-db/schemas/user.schema';
import { BcryptService } from 'src/common/providers/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly bcryptService: BcryptService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcryptService.encryptPassword(createUserDto.password);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    user.save({});
    return { statusCode: 201, id: user._id }
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password').exec();
    return user;
    // return this.userModel.findById(id).select('-password').exec();
  }
}