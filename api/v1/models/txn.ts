import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./users";

export class TxnModel {
  @prop({
    required: true,
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  userId: Ref<UserModel>;

  @prop()
  amount!: number;

  @prop({ required: false })
  pay: number;

  @prop()
  txnNum: number;

  @prop({
    required: false,
    default: false,
    type: Boolean,
  })
  widhrawal: boolean;

  @prop({
    required: false,
    default: false,
    type: Boolean,
  })
  inBank?: boolean;

  @prop({
    required: false,
    type: String,
  })
  upi?: string;

  @prop({
    required: false,
    default: 0, // 0-pending, 1-approved, 2-rejected
    type: Number,
  })
  status: number;

}

const Txn = getModelForClass(TxnModel, {
  schemaOptions: {
    collection: "txn",
    timestamps: true,
  },
});

export default Txn;
