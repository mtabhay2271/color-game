import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./users";

export class BankModel {
  @prop({
    required: true,
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  userId: Ref<UserModel>;

  @prop()
  username!: string;

  @prop()
  email!: string;

  @prop()
  password!: string;

  @prop()
  role: string;

  @prop()
  phoneNumber!: number;

  @prop()
  device_token!: number;
  
  @prop()
  userToken!: number;

  @prop()
  block: string

  @prop()
  otp: string;
}

const Users = getModelForClass(BankModel, {
  schemaOptions: {
    collection: "bankDetails",
    timestamps: true,
  },
});

export default Users;
