import { UniversalMessage } from './universal-message.type';

export interface LlmInterface {
  providerName: string;
  maxTokens: number;

  generateResponse(messages: UniversalMessage[]): Promise<string>;
}
