import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/mongo-db/schemas/user.schema';
import { BcryptService } from 'src/common/providers/bcrypt.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly bcryptService: BcryptService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });

    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await this.bcryptService.encryptPassword(createUserDto.password);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    user.save();
    return { id: user._id }
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password').exec();
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { email, password, ...rest } = updateUserDto;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (email && email !== user.email) {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new BadRequestException('El email ya está registrado');
      }
    }

    let updateData: any = { ...rest };

    if (password) {
      const hashedPassword = await this.bcryptService.encryptPassword(password);
      updateData.password = hashedPassword;
    }

    if (email) {
      updateData.email = email;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true },
    ).select('-password');

    return { id: updatedUser?._id };
  }

}