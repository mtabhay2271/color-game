import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";

export class QueryModel {
  @prop()
  name!: string;

  @prop()
  email!: string;

  @prop()
  message!: string;

}

const Query = getModelForClass(QueryModel, {
  schemaOptions: {
    collection: "queries",
    timestamps: true,
  },
});

export default Query;
