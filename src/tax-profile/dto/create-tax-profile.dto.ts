import { IsEnum, IsOptional, IsNumber } from 'class-validator';
import { RegimenFiscal } from 'src/mongo-db/enums';

export class CreateTaxProfileDto {
    @IsEnum(RegimenFiscal)
    regimen_fiscal: RegimenFiscal;

    @IsOptional()
    last_regimen_update?: Date;

    @IsOptional()
    @IsNumber()
    current_salary?: number;

    @IsOptional()
    @IsNumber()
    max_income_allowed?: number;
}
