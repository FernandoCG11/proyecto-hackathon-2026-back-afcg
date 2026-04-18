import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/mongo-db/schemas/user.schema';
import { BcryptService } from 'src/common/providers/bcrypt.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema }
  ]),
    BcryptService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
