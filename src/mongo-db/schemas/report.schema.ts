import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

export enum ReportType {
    MENSUAL = 'MENSUAL',
    ANUAL = 'ANUAL',
    PERSONALIZADO = 'PERSONALIZADO',
}

@Schema({ timestamps: true })
export class Report {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
    user_id: Types.ObjectId;

    @Prop({ enum: ReportType, required: true })
    type: ReportType;

    @Prop({ required: true })
    start_date: Date;

    @Prop({ required: true })
    end_date: Date;

    @Prop({ type: Number, default: 0 })
    total_expenses: number;

    @Prop({ type: Number, default: 0 })
    total_deductible: number;

    @Prop({ type: Number, default: 0 })
    total_taxable: number;

    @Prop({ type: [Types.ObjectId], ref: 'BusinessTransaction' })
    transactions: Types.ObjectId[];

    @Prop({
        type: [
            {
                amount: { type: Number, required: true },
                description: { type: String, required: true },
            },
        ],
        default: [],
    })
    other_incomes: {
        amount: number;
        description: string;
    }[];

    @Prop({ default: false })
    is_closed: boolean;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
