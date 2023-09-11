import { mongoose, Ref } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  isDefined,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class BankDetailsViewModel {


  @Expose()
  @IsDefined()
  @IsNotEmpty()
  accountHolderName!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  bank!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  ifscCode!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  accountNumber!: number;


  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsNumber()
  // @Type(() => Number)
  // phoneNumber!: number;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // city!: string;

  // @Expose()
  // @IsDefined()
  // @IsNotEmpty()
  // state!: string;

  // @Expose()
  // @IsDefined()
  // country: string

  // @Expose()
  // @IsDefined()
  // @IsEmail()
  // email: string;
}
