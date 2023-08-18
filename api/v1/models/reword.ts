import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./users";

export class RewordModel {
  @prop({
    required: true,
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  userId: Ref<UserModel>;

  @prop({
    required: false,
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  downlineId: Ref<UserModel>;

  @prop({
    required: false
  })
  amount: number;

  @prop({
    required: false
  })
  oldBalance: number;
}

const Reword = getModelForClass(RewordModel, {
  schemaOptions: {
    collection: "reword",
    timestamps: true,
  },
});

export default Reword;
