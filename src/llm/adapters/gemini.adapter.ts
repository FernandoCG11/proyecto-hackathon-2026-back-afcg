import { GoogleGenerativeAI } from '@google/generative-ai';
import { LlmInterface } from '../llm.interface';
import { UniversalMessage } from '../universal-message.type';
import { VAN_TAX_IDENTITY } from '../constants/Identidad';

export default class GeminiAdapter implements LlmInterface {
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
      }
    });

    const geminiMessages = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

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
