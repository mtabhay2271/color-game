import { Request, Response, query } from "express";
import { ICommonServices } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import Pay from "../models/upi";
class dataServicesData {

  createUpi = async (req: Request): Promise<ICommonServices> => {
    try {
      let data = await Pay.create(
        {
          upi: req.body.upi
        }
      )
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "upi Added",
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
  getUpi = async (req: Request): Promise<ICommonServices> => {
    try {
      let data = await Pay.find({}).lean()

      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Pay Found",
            data: data[0]
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

