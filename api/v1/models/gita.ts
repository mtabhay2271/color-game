import { getModelForClass, prop } from "@typegoose/typegoose";

export class GitaModel {
  @prop({
    required: true
  })
  title: string;

  @prop({
    required: true
  })
  data: string;

}

const Gita = getModelForClass(GitaModel, {
  schemaOptions: {
    collection: "gita",
    timestamps: true,
  },
});

export default Gita;
