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

enum Role {
  superadmin,
  user
}

export class SignupViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  name!: string;

  @Expose()
  @IsDefined()
  @IsNumber()
  username!: number;
  
  @Expose()
  @IsDefined()
  @IsEmail()
  email!: string;
  
  @Expose()
  @IsDefined()
  @IsString()
  password!: string;
}