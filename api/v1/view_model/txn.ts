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

export class TxnViewModel {

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  amount!: number;
  
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  txnNum!: number;

  @Expose()
  @IsDefined()
  @IsOptional()
  widhrawal: boolean;

}
