import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import BankDetails from "../models/bank";
import { TxnViewModel } from "../view_model/txn";
import TxnModel from "../models/txn";
import Users from "../models/users";


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
            message: "Txn added",
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
      let data: any = await TxnModel.find({ userId }).lean();
      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn History found",
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

  approveTxn = async (req: Request, id: string): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let user = await Users.findById(payload.userId, { availabelAmount: 1 }).lean();

      let data: any = await TxnModel.findByIdAndUpdate(id, { $set: { approve: 1 } },{new : true});

      if (user) {
        let balance = await Users.findByIdAndUpdate(payload.userId, { $set: { availabelAmount: user.availabelAmount +  data.amount } }, { new: true })
      }

      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn approved",
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

  rejectTxn = async (id: string): Promise<ICommonServices> => {
    try {
      let data: any = await TxnModel.findByIdAndUpdate(id, { $set: { approve: 2 } },{new : true});
      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn rejected",
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

