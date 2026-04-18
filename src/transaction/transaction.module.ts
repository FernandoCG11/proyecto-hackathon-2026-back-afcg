import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LlmModule } from 'src/llm/llm.module';
import {
  BusinessTransaction,
  BusinessTransactionSchema,
} from 'src/mongo-db/schemas/business-transaction.schema';
import { Report, ReportSchema } from 'src/mongo-db/schemas/report.schema';

@Module({
  imports: [
    LlmModule,
    MongooseModule.forFeature([
      {
        name: BusinessTransaction.name,
        schema: BusinessTransactionSchema,
      },
      { name: Report.name, schema: ReportSchema },

    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule { }
