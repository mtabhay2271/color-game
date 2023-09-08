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
  name!: string;

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
  contactNumber!: number;

  @Expose()
  @IsString()
  referCode?: string;

  // @Expose()
  // @IsDefined()
  // status!: string;


  @Expose()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  uplineId?: Ref<UserModel>;

  @Expose()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  uplineId2?: Ref<UserModel>;

  @Expose()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  uplineId3?: Ref<UserModel>;
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

// export class ForgetPasswordViewModel {
//   @Expose()
//   @IsDefined()
//   @IsString()
//   username: string;
// }

export class ForgetPasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  email: string;
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

// export class ResetPasswordViewModel {
//   @Expose()
//   @IsDefined()
//   @IsString()
//   username: string;

//   @Expose()
//   @IsDefined()
//   @IsString()
//   otp: string;

//   @Expose()
//   @IsDefined()
//   @IsString()
//   password: string;
// }

export class ResetPasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  userId: string;

  // @Expose()
  // @IsDefined()
  // @IsString()
  // otp: string;

  @Expose()
  @IsDefined()
  @IsString()
  password: string;
}

// export class ResetPasswordViewModel {
//   @Expose()
//   @IsDefined()
//   @IsString()
//   newPassword: string;

//   @Expose()
//   @IsDefined()
//   @IsString()
//   confirmPassword: string;
// }

export class PaymentRefViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  paymentRefNumber!: number;
}