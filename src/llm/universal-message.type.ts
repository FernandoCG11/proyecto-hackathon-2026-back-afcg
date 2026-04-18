export type Role = 'system' | 'user' | 'assistant' | 'context';

export interface UniversalMessage {
  role: Role;
  content: string;
  images?: {
    mimeType: string;
    data: string;
  }[];
}
