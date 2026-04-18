import { SchemaType, Schema } from '@google/generative-ai/server';
export const RESPONSE: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    is_deductible: { type: SchemaType.BOOLEAN },
    category: { type: SchemaType.STRING },
    estimated_refund_impact: { type: SchemaType.NUMBER },
    law_article: { type: SchemaType.STRING },
    analysis: { type: SchemaType.STRING },
    warning_flag: { type: SchemaType.STRING },
  },
};
