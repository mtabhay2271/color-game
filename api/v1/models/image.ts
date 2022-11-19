import { getModelForClass, prop } from "@typegoose/typegoose";

export class WallpaperModel {
  @prop({
    required: true
  })
  cat: number;

  @prop({
    required: true
  })
  img: {
    data: {type: Buffer},
    contentType:{type: String}
  }

}

const Wallpaper = getModelForClass(WallpaperModel, {
  schemaOptions: {
    collection: "wallpaper",
    timestamps: true,
  },
});

export default Wallpaper;


// var mongoose = require('mongoose');
  
// var WallpaperSchema = new mongoose.Schema({
//     name: String,
//     img:
//     {
//         data: Buffer,
//         contentType: String
//     }
// }); 
  
// //Image is a model which has a schema WallpaperSchema
  
// module.exports = new mongoose.model('wallpaper', WallpaperSchema);

