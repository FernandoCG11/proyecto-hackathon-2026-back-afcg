import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BusinessTransaction,
  BusinessTransactionDocument,
} from 'src/mongo-db/schemas/business-transaction.schema';
import { LlmService } from '../llm/llm.service';
import { ReportDocument, ReportType, Report } from 'src/mongo-db/schemas/report.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(BusinessTransaction.name)
    private readonly transactionModel: Model<BusinessTransactionDocument>,
    private readonly llmService: LlmService,
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>
  ) { }
  async create(data: {
    userId: string;
    file?: Express.Multer.File;
    message: string;
  }) {
    const { userId, file, message } = data;

    if (!file) {
      throw new BadRequestException('Image is required');
    }

    // 1. Extraer info con IA
    const extractedData = await this.llmService.extractTransactionData(
      message,
      file,
    );

    // 2. Crear transacción
    const transaction = await this.transactionModel.create({
      user_id: new Types.ObjectId(userId),
      concept: extractedData.concept ?? message,
      amount: Types.Decimal128.fromString(
        String(extractedData.amount ?? 0),
      ),
      payment_method: extractedData.payment_method ?? 'EFECTIVO',

      is_traceable: extractedData.is_traceable ?? false,
      tax_impact_note: extractedData.tax_impact_note ?? '',
      ai_response: extractedData.ai_response ?? '',
      has_invoice: extractedData.has_invoice ?? false,
      type: extractedData.type,
      is_deductible: extractedData.is_deductible ?? false,
      status: true,
    });

    // 3. Crear/actualizar reporte mensual
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    let report = await this.reportModel.findOne({
      user_id: new Types.ObjectId(userId),
      type: ReportType.MENSUAL,
      start_date: startOfMonth,
      end_date: endOfMonth,
    });

    const amount = Number(extractedData.amount ?? 0);

    if (!report) {
      report = await this.reportModel.create({
        user_id: new Types.ObjectId(userId),
        type: ReportType.MENSUAL,
        start_date: startOfMonth,
        end_date: endOfMonth,
        transactions: [transaction._id],

        total_expenses: amount,
        total_deductible: extractedData.is_deductible ? amount : 0,
        total_taxable: extractedData.is_deductible ? 0 : amount,
      });
    } else {
      report.transactions.push(transaction._id);

      report.total_expenses += amount;

      if (extractedData.is_deductible) {
        report.total_deductible += amount;
      } else {
        report.total_taxable += amount;
      }

      await report.save();
    }

    // 4. Response final
    return {
      success: true,
      transaction: {
        id: transaction._id,
        concept: transaction.concept,
        amount,
      },
      report: {
        id: report._id,
        period: `${startOfMonth.toISOString()} - ${endOfMonth.toISOString()}`,
      },
    };
  }

  async findAllByUser(userId: string) {
    return this.transactionModel.find({
      user_id: new Types.ObjectId(userId),
    });
  }

  async findOneByUser(userId: string, transactionId: string) {
    const transaction = await this.transactionModel.findOne({
      _id: new Types.ObjectId(transactionId),
      user_id: new Types.ObjectId(userId),
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found for this user');
    }

    return transaction;
  }
}
