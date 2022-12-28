import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import BankDetails from "../models/bank";
import SupportModel from "../models/support";
import { BankDetailsViewModel } from "../view_model/bank";

class dataServicesData {

  addBankDetails = async (req: Request, reqData: BankDetailsViewModel): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let data: any = await BankDetails.create({ ...reqData, userId: payload.userId });
      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Bank details added",
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

  getBankDetails = async (userId: string): Promise<ICommonServices> => {
    try {
      let data: any = await BankDetails.findOne({ userId }).lean();
      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Bank Details found",
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

