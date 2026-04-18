import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessTransaction,
  BusinessTransactionSchema,
} from 'src/mongo-db/schemas/business-transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BusinessTransaction.name,
        schema: BusinessTransactionSchema,
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
