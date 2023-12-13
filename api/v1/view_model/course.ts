import { Expose, Type } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class AddCourseViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  title: string;

  @Expose()
  @IsDefined()
  @IsString()
  description: string;

  @Expose()
  @IsDefined()
  @IsString()
  image: string;

  @Expose()
  @IsDefined()
  @IsNumber()
  category: number;
}
