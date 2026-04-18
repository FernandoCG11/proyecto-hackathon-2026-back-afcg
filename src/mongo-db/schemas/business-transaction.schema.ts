import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PaymentMethod } from '../enums';

export type BusinessTransactionDocument = HydratedDocument<BusinessTransaction>;

@Schema({ timestamps: true })
export class BusinessTransaction {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop()
    concept: string;

    @Prop({ type: Number, required: true })
    amount: number;

    @Prop({ enum: PaymentMethod, required: true })
    payment_method: PaymentMethod;

    @Prop({ default: false })
    is_traceable: boolean;

    @Prop()
    tax_impact_note: string;

    @Prop()
    ai_response: string;

    @Prop({ default: false })
    has_invoice: boolean;

    @Prop({ default: false })
    is_deductible: boolean;

    @Prop({ default: true })
    status: boolean;
}

export const BusinessTransactionSchema = SchemaFactory.createForClass(BusinessTransaction);
