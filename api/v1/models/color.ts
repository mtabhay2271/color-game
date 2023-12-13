import { getModelForClass, prop } from "@typegoose/typegoose";

export class ColorModel {
  @prop({
    required: true
  })
  num: number;

  @prop({
    required: true
  })
  result: number;

}

const Color = getModelForClass(ColorModel, {
  schemaOptions: {
    collection: "colorresult",
    timestamps: true,
  },
});

export default Color;
