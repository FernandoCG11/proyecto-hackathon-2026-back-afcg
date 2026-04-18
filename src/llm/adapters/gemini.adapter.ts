import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { LlmInterface } from '../llm.interface';
import { UniversalMessage } from '../universal-message.type';
import { VAN_TAX_IDENTITY } from '../constants/Identidad';
import { RESPONSE } from '../constants/response';

export class GeminiAdapter implements LlmInterface {
  private geminiModel: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables.');
    }
    this.geminiModel = new GoogleGenerativeAI(apiKey);
  }

  providerName = 'gemini';
  maxTokens: number = 128000;

  async generateResponse(messages: UniversalMessage[]): Promise<string> {
    const model = this.geminiModel.getGenerativeModel({
      //Configuracion de Modelo, temperatura y la personalidad que tendras
      model: 'gemini-3-flash-preview',
      systemInstruction: VAN_TAX_IDENTITY,
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE,
      },
    });

    const geminiMessages = messages.map((msg) => {
      const parts: Part[] = [{ text: msg.content }];

      if (msg.images && msg.images.length > 0) {
        msg.images.forEach((img) => {
          parts.push({
            inlineData: {
              mimeType: img.mimeType,
              data: img.data,
            },
          });
        });
      }
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      };
    });

    try {
      const result = await model.generateContent({ contents: geminiMessages });
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}
