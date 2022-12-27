import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import BankDetails from "../models/bank";
import { TxnViewModel } from "../view_model/txn";
import TxnModel from "../models/txn";

class dataServicesData {

  addTxn = async (req: Request, reqData: TxnViewModel): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let data: any = await TxnModel.create({ ...reqData, userId: payload.userId });
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

  getTxn = async (userId: string): Promise<ICommonServices> => {
    try {
      let data: any = await TxnModel.findOne({ userId }).lean();
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

