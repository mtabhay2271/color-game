import { Request } from "express";
import { ICommonServices } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { AddGitaViewModel } from "../view_model/commondata";
import Gita from "../models/gita";

class dataServicesData {

  add = async (req: Request, addVideoData: AddGitaViewModel): Promise<ICommonServices> => {
    try {
      let data: any = await Gita.create(addVideoData);
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Gita added succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Gita not added" } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  get = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Gita.find({}).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Gita list found succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Gita list not found succuessfully" } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  getById = async (id:string): Promise<ICommonServices> => {
    try {
      let data: any = await Gita.findById(id).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Gita found succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Gita not found succuessfully", } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };


}
export default new dataServicesData();

