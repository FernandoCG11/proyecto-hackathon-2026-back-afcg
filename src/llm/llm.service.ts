import { BadRequestException, Injectable } from '@nestjs/common';
import { GeminiAdapter } from './adapters';
import { UniversalMessage } from './universal-message.type';
import { BusinessTransactionDocument } from '../mongo-db/schemas/business-transaction.schema';

@Injectable()
export class LlmService {
  private adapter: GeminiAdapter;

  constructor() {
    this.adapter = new GeminiAdapter();
  }

  async extractTransactionData(message: string, file: Express.Multer.File) {
    const universalMessage: UniversalMessage[] = [
      {
        role: 'user',
        content: 'Analiza el recibo o factura y extrae su informacion',
        images: [
          {
            mimeType: file.mimetype,
            data: file.buffer.toString('base64'),
          },
        ],
      },
    ];
    try {
      const responseText =
        await this.adapter.generateResponse(universalMessage);
      return JSON.parse(responseText) as BusinessTransactionDocument;
    } catch (err) {
      const error = err as Error;
      throw new BadRequestException(error.message.split(`/n`).pop);
    }
  }
}
