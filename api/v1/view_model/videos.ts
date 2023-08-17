import { Expose, Type } from "class-transformer";
import { IsDefined, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class AddVideoViewModel {

  @Expose()
  @IsDefined()
  @IsNumber()
  @Type(() => Number)
  srNo: number;

  @Expose()
  @IsDefined()
  @IsString()
  title: string;

  @Expose()
  @IsDefined()
  @IsString()
  url: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsMongoId()
  courseId: string

  @Expose()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  status: number;
}
