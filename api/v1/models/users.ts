import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";

export class UserModel {
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
  availabelAmount!: number;

  @prop()
  winningAmount!: number;

  @prop()
  device_token!: number;
  
  @prop()
  userToken!: number;

  @prop()
  block: string

  @prop()
  otp: string;
}

const Users = getModelForClass(UserModel, {
  schemaOptions: {
    collection: "users",
    timestamps: true,
  },
});

export default Users;
