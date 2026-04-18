import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Report, ReportDocument, ReportType } from 'src/mongo-db/schemas/report.schema';
import { BusinessTransaction, BusinessTransactionDocument } from 'src/mongo-db/schemas/business-transaction.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>,

    @InjectModel(BusinessTransaction.name)
    private readonly transactionModel: Model<BusinessTransactionDocument>,
  ) { }

  async generateMonthly(userId: string) {
    const userObjectId = new Types.ObjectId(userId);

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await this.transactionModel.find({
      user_id: userObjectId,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    const transactionIds = transactions.map((t) => t._id);

    await this.reportModel.deleteMany({
      user_id: userObjectId,
      type: ReportType.MENSUAL,
      start_date: start,
      end_date: end,
    });

    let total_expenses = 0;
    let total_deductible = 0;
    let total_taxable = 0;

    for (const t of transactions) {
      const amount = Number(t.amount);

      total_expenses += amount;

      if (t.is_deductible) {
        total_deductible += amount;
      } else {
        total_taxable += amount;
      }
    }

    const report = await this.reportModel.create({
      user_id: userObjectId,
      type: ReportType.MENSUAL,
      start_date: start,
      end_date: end,

      transactions: transactionIds,

      total_expenses,
      total_deductible,
      total_taxable,

      other_incomes: [],
      is_closed: false,
    });

    return {
      message: 'Monthly report generated successfully',
      report,
    };
  }

  async findAllByUser(userId: string) {
    return this.reportModel
      .find({
        user_id: new Types.ObjectId(userId),
      })
      .sort({ createdAt: -1 })
      .populate('transactions');
  }

  async findOne(reportId: string, userId: string) {
    return this.reportModel.findOne({
      _id: new Types.ObjectId(reportId),
      user_id: new Types.ObjectId(userId),
    }).populate('transactions');
  }
}
