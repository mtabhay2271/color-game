import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";

export class FileUserModel {
  @prop()
  name!: string;

  @prop()
  username!: number;

  @prop()
  email!: string;

  @prop()
  password!: string;
}

const Users = getModelForClass(FileUserModel, {
  schemaOptions: {
    collection: "fileusers",
    timestamps: true,
  },
});

export default Users;
