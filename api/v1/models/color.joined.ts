import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./users";

export class JoinModel {
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
  color: number;

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

const Join = getModelForClass(JoinModel, {
  schemaOptions: {
    collection: "join",
    timestamps: true
  },
});

export default Join;
