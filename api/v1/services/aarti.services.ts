import { Request } from "express";
import { ICommonServices } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { AddAartiViewModel } from "../view_model/commondata";
import Aarti from "../models/aarti";

class dataServicesData {

  add = async (req: Request, addData: AddAartiViewModel): Promise<ICommonServices> => {
    try {
      let data: any = await Aarti.create(addData);
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Aarti added succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Aarti not added" } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  get = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Aarti.find({}).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Aarti list found succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Aarti list not found succuessfully", } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  getById = async (id:string): Promise<ICommonServices> => {
    try {
      let data: any = await Aarti.findById(id).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Aarti found succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Aarti not found succuessfully", } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new dataServicesData();

