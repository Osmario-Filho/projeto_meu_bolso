import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNotEmpty({ message: 'A transação deve pertencer a uma categoria.' })
  @IsUUID()
  categoryId: string;
}
