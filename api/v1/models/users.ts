import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";

export class UserModel {
  @prop()
  username!: string;

  @prop()
  email!: string;

  @prop()
  password!: string;

  @prop()
  phone_number!: number;

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
