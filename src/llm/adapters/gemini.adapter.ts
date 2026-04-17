import { GoogleGenerativeAI } from '@google/generative-ai';
import { LlmInterface } from '../llm.interface';
import { UniversalMessage } from '../universal-message.type';

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
      model: 'gemini-3-flash-preview',
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
