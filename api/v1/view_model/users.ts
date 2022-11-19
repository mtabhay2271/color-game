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
import { UserModel } from "../models/users";

enum Role {
  superadmin,
  user
}

export class SignupViewModel {

  @Expose()
  @IsDefined()
  @IsString()
  username!: string;
  
  @Expose()
  @IsDefined()
  @IsEmail()
  email!: string;
  
  @Expose()
  @IsDefined()
  @IsString()
  password!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  phoneNumber!: number;

}

export class LoginViewModel {
  @Expose()
  @IsDefined()
  username!: string;

  @Expose()
  @IsDefined()
  @IsString()
  password!: string;
}

export class verifyOtpViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  otp!: number;
}

export class ChangePasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  oldPassword: string;

  @Expose()
  @IsDefined()
  @IsString()
  newPassword: string;
}

export class ForgetPasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  email: string;
}

export class ResetPasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  username: string;
  
  @Expose()
  @IsDefined()
  @IsString()
  otp: string;
  
  @Expose()
  @IsDefined()
  @IsString()
  password: string;
}
export class PaymentRefViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  paymentRefNumber!: number;
}