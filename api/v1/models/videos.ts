import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserModel } from "./users";
import { CourseModel } from "./course";

export class VideoModel {

  @prop({
    ref: CourseModel,
    type: mongoose.Types.ObjectId,
  })
  courseId: Ref<CourseModel>;

  @prop({
    required: true,
  })
  srNo: number;

  @prop({
    required: true,
  })
  title: string;

  @prop({
    required: true,
  })
  desc: string;

  @prop({
    required: true
  })
  url: string;

  @prop({
    required: false,
    default: 1
  })
  status: number;

}

const Videos = getModelForClass(VideoModel, {
  schemaOptions: {
    collection: "videos",
    timestamps: true,
  },
});

export default Videos;
