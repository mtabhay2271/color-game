import { getModelForClass, prop } from "@typegoose/typegoose";

export class SupportModel {
  @prop()
  email: string;

  @prop()
  contactNumber!: number;
}

const Support = getModelForClass(SupportModel, {
  schemaOptions: {
    collection: "support",
    timestamps: true,
  },
});

export default Support;
