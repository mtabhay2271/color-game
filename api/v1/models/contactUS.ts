import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";

export class ContactUsModel {
  @prop()
  name: string;

  @prop()
  address: string;

  @prop()
  email: string;

  @prop()
  contactNumber!: number;
}

const ContactUs = getModelForClass(ContactUsModel, {
  schemaOptions: {
    collection: "contactus",
    timestamps: true,
  },
});

export default ContactUs;
