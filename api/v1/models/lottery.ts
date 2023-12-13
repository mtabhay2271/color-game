import { getModelForClass, prop } from "@typegoose/typegoose";

export class LotteryModel {
  @prop({
    required: true
  })
  num: number;

  @prop({
    required: true
  })
  result: number;

}

const Lottery = getModelForClass(LotteryModel, {
  schemaOptions: {
    collection: "lottery_result",
    timestamps: true,
  },
});

export default Lottery;
