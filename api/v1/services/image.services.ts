import { ICommonServices } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import imgModel from "../models/image";
import fs from 'fs'
import path from "path";


class dataServicesData {

  add = async (req: any, res: any): Promise<ICommonServices> => {
    try {
      // if (!fs.existsSync('uploads')) {
      //   fs.mkdirSync('uploads', { recursive: true });
      // }
      let pathName = path.join('uploads/' + req.file.filename);
      var obj = {
        cat: req.body.cat,
        img: {
          data: fs.readFileSync(pathName),
          contentType: 'image/png'
        }
      }
      let image = await imgModel.create(obj);

      fs.unlink(pathName, err => {
        if (err) {
          throw err
        }
        // console.log('File is deleted.', pathName)
      });

      //dev mode
      // res.redirect('/image');

      //live
      return {
        statusCode: 200,
        data: {
          success: true,
          message: "Image Uploaded",
          data: image
        }
      };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  get = async (cat:number): Promise<ICommonServices> => {
    try {
      let data: any = await imgModel.find({cat}).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Image list found",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };


  getById = async (id:string): Promise<ICommonServices> => {
    try {
      let data: any = await imgModel.findById(id).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Image found successfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Image not found successfully", } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new dataServicesData();

