import { getModelForClass, prop } from "@typegoose/typegoose";

export class AartiModel {
  @prop({
    required: true
  })
  title: string;

  @prop({
    required: true
  })
  data: string;

}

const Aarti = getModelForClass(AartiModel, {
  schemaOptions: {
    collection: "aarti",
    timestamps: true,
  },
});

export default Aarti;
