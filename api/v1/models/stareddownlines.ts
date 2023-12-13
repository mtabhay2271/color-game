import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./users";

export class StaredDownlineModel {
  @prop({
    required: true,
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  uplineId!: Ref<UserModel>;
  
  @prop({
    required: true,
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  downlineId!: Ref<UserModel>;

}

const StaredDownline = getModelForClass(StaredDownlineModel, {
  schemaOptions: {
    collection: "stareddownline",
    timestamps: true,
  },
});

export default StaredDownline;
