import { Expose } from "class-transformer";
import {
  IsDefined,
  IsString
} from "class-validator";


export class AddVideoViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  title: string;

  @Expose()
  @IsDefined()
  @IsString()
  url: string;
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