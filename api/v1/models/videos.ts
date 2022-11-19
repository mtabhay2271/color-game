import { getModelForClass, prop } from "@typegoose/typegoose";

export class VideoModel {
  @prop({
    required: true
  })
  title: string;

  @prop({
    required: true
  })
  url: string;

}

const Videos = getModelForClass(VideoModel, {
  schemaOptions: {
    collection: "videos",
    timestamps: true,
  },
});

export default Videos;
