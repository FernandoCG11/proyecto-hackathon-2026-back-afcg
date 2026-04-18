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

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(BusinessTransaction.name)
    private readonly transactionModel: Model<BusinessTransactionDocument>,
  ) {}

  async create(data: {
    userId: string;
    file: Express.Multer.File;
    message: string;
  }) {
    const { userId, file, message } = data;

    if (!file) {
      throw new BadRequestException('Image is required');
    }

    // 🔥 Aquí después irá IA + OCR

    const transaction = await this.transactionModel.create({
      user_id: new Types.ObjectId(userId),
      concept: message, // temporal
      amount: 0, // placeholder
      payment_method: 'EFECTIVO', // placeholder
    });

    return {
      id: transaction._id,
      fileName: file.originalname,
      message,
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
