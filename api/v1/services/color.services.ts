import { Request } from "express";
import { ICommonServices } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { AddColor } from "../view_model/commondata";
import Color from "../models/color";

class dataServicesData {

  add = async (req: Request, addColor: AddColor): Promise<ICommonServices> => {
    try {
      let getdata = await Color.find({});
      let data: any = await Color.create({ result: addColor.result, num: (getdata.length + 1) });
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Color added succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Color not added" } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  get = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Color.find({}, { num: 1, result: 1, }).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "list found succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Color list not found succuessfully" } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  getById = async (id: string): Promise<ICommonServices> => {
    try {
      let data: any = await Color.findById(id).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Color found succuessfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Color not found succuessfully", } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };


}
export default new dataServicesData();

