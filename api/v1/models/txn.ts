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

  @prop()
  txnNum!: number;

  @prop({
    required: false,
    default: false,
    type: Boolean,
  })
  widhrawal!: boolean;
  
}

const Txn = getModelForClass(TxnModel, {
  schemaOptions: {
    collection: "txn",
    timestamps: true,
  },
});

export default Txn;
