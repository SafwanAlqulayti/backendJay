import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantBranchDto {
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsString()
  @IsNotEmpty()
  branchName: string;

  @IsString()
  @IsNotEmpty()
  branclLatitude: string;

  @IsString()
  @IsNotEmpty()
  branchLongitude: string;

  @IsString()
  @IsNotEmpty()
  kind: string;
}
