import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";

export class UserModel {
  @prop()
  name!: string;

  @prop()
  username!: string;

  @prop()
  email!: string;

  @prop()
  password!: string;


  @prop()
  contactNumber!: number;

  @prop({ default: "user" })
  role: string;

  @prop()
  referCode: string

  @prop({ default: 0 })
  status: number

  @prop({
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  uplineId: Ref<UserModel>;
  @prop({
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  uplineId2: Ref<UserModel>;
  @prop({
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  uplineId3: Ref<UserModel>;
  @prop({
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  uplineId4: Ref<UserModel>;
  @prop({
    ref: UserModel,
    type: mongoose.Types.ObjectId,
  })
  uplineId5: Ref<UserModel>;

  @prop({
    required: false,
    default: false
  })
  isPaymentDone: boolean;

  @prop({
    required: false,
    default: 0
  })
  paymentStatus: number;

  @prop()
  paymentRefNumber: number;

  @prop({
    required: false,
    default: 0
  })
  myNetwork: number;

  @prop({
    required: false,
    default: 0
  })
  availableAmount!: number;

  @prop({
    required: false,
    default: 0
  })
  earningAmount!: number;

  @prop({
    required: false,
    default: 0
  })
  totalEarning: number;

  @prop({
    required: false,
    default: false
  })
  isAccepted!: boolean;

  @prop({
    required: false,
    default: false
  })
  isRejected!: boolean;

  @prop({
    required: false,
    default: false
  })
  isBlockeded!: boolean;

  @prop({
    required: false,
    default: ''
  })
  deviceToken!: string;

  @prop()
  forgetPassOtp!: string;

  @prop()
  otp: string;


  //Bank details

  @prop({ required: false })
  accountHolderName: string;

  @prop({ required: false })
  bank: string;

  @prop({ required: false })
  ifscCode: string;

  @prop({ required: false })
  accountNumber: number;
}

const Users = getModelForClass(UserModel, {
  schemaOptions: {
    collection: "users",
    timestamps: true,
  },
});

export default Users;
