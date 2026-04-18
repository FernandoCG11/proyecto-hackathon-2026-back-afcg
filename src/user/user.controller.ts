import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: UserLoginDto) {
    return this.userService.login(createUserDto);
  }

  @Get(':userId')
  getUserById(@Param('userId', ParseMongoIdPipe) userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseMongoIdPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }
}
