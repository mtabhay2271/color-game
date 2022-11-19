import { Expose } from "class-transformer";
import {
  IsDefined,
  IsNumber,
  IsString
} from "class-validator";


export class AddColor {
  @Expose()
  @IsDefined()
  @IsNumber()
  result: string;
}


export class AddAartiViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  title: string;

  @Expose()
  @IsDefined()
  @IsString()
  data: string;
}

export class AddGitaViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  title: string;

  @Expose()
  @IsDefined()
  @IsString()
  data: string;
}