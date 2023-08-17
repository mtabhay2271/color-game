import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";

export class PayMethodModel {
  @prop()
  upi_ids!: string[];
  @prop()
  phone_numbers!: string[];
  @prop()
  whatsup_number!: string;

}

const PayMethod = getModelForClass(PayMethodModel, {
  schemaOptions: {
    collection: "pay",
    timestamps: true,
  },
});

export default PayMethod;
