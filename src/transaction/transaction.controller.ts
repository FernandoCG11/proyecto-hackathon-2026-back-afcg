import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionService } from './transaction.service';


@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) { }

  @Post('users/:userId/business-transactions')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('message') message: string,
  ) {
    return this.transactionService.create({
      userId,
      file,
      message,
    });
  }

  @Get('users/:userId/business-transactions')
  findAllByUser(@Param('userId') userId: string) {
    return this.transactionService.findAllByUser(userId);
  }

  @Get('users/:userId/business-transactions/:transactionId')
  findOneByUser(
    @Param('userId') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.transactionService.findOneByUser(
      userId,
      transactionId,
    );
  }
}
