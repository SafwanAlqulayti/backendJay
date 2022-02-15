import { IsNotEmpty, IsUUID } from 'class-validator';

export class HistroyOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
