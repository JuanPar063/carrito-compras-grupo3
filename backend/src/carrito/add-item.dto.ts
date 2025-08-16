import { IsString, IsUUID, IsNumber, Min } from 'class-validator';

export class AddItemDto {
  @IsUUID()
  @IsString()
  productoId: string;

  @IsNumber()
  @Min(1)
  cantidad: number;
}