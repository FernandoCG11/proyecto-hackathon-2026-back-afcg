import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RegimenFiscal } from '../enums';

export type TaxProfileDocument = HydratedDocument<TaxProfile>;

@Schema({ timestamps: true })
export class TaxProfile {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ enum: RegimenFiscal, required: true })
    regimen_fiscal: RegimenFiscal;

    @Prop()
    last_regimen_update: Date;

    @Prop({ type: Number })
    current_salary: number;

    @Prop({ type: Number })
    max_income_allowed: number;
}

export const TaxProfileSchema = SchemaFactory.createForClass(TaxProfile);
