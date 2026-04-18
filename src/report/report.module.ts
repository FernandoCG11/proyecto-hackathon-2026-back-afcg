import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from 'src/mongo-db/schemas/report.schema';
import { BusinessTransaction, BusinessTransactionSchema } from 'src/mongo-db/schemas/business-transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Report.name, schema: ReportSchema },
    { name: BusinessTransaction.name, schema: BusinessTransactionSchema }
  ])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule { }
