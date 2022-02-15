import { IsNotEmpty, IsString } from 'class-validator';

export class FindBranchDto {
  @IsNotEmpty()
  @IsString()
  branchId: string;
}
