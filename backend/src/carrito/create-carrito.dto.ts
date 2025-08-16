import { IsString, IsUUID } from 'class-validator';

export class CreateCarritoDto {
  @IsUUID()
  @IsString()
  usuarioId: string;
}