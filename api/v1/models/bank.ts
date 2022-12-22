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
  accountHolderName!: string;

  @prop()
  bank!: string;

  @prop()
  ifscCode!: string;

  @prop()
  accountNumber!: number;

  @prop()
  phoneNumber!: number;

  @prop()
  city!: string;
  
  @prop()
  state!: string;

  @prop()
  country: string

  @prop()
  email: string;
}

const BankDetails = getModelForClass(BankModel, {
  schemaOptions: {
    collection: "bankdetails",
    timestamps: true,
  },
});

export default BankDetails;
