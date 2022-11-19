import { getModelForClass, prop } from "@typegoose/typegoose";

export class ContactUsModel {
  @prop()
  name: string;

  @prop()
  village: string;

  @prop()
  post: string;

  @prop()
  teh: string;

  @prop()
  dist: string;

  @prop()
  pincode: number;

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
