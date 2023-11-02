import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./users";

export class JoinLotteryModel {
  @prop({
    required: true,
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  userId: Ref<UserModel>;

  @prop({
    required: true
  })
  num: number;

  @prop({
    required: true
  })
  choosenNum: number;

  @prop({
    required: true
  })
  amount: number;

  @prop({
    required: true
  })
  taxAmount: number;

  @prop({
    required: false
  })
  result: number;
}

const JoinLottery = getModelForClass(JoinLotteryModel, {
  schemaOptions: {
    collection: "lottery_join",
    timestamps: true
  },
});

export default JoinLottery;
