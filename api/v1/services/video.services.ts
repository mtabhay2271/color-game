import { Request } from "express";
import { ICommonServices } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { AddVideoViewModel } from "../view_model/commondata";
import Videos from "../models/videos";

class dataServicesData {

  add = async (req: Request, addVideoData: AddVideoViewModel): Promise<ICommonServices> => {
    try {
      let data: any = await Videos.create(addVideoData);
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "video added",
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

  get = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Videos.find({}).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "video list found",
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

}
export default new dataServicesData();

