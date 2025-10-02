import { IsNotEmpty, IsNumber, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsNotEmpty()
  @IsInt()
  @Min(2000)
  year: number;

  @IsNotEmpty({ message: 'O orçamento deve pertencer a uma categoria.' })
  @IsUUID()
  categoryId: string;
}
