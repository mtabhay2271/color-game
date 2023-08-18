import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import BankDetails from "../models/bank";
import { TxnViewModel } from "../view_model/txn";
import TxnModel from "../models/txn";
import Users from "../models/users";


class dataServicesData {

  addTxn = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let data: any = await TxnModel.create({ ...req.body, userId: payload.userId });
      if (data.widhrawal) {
        let userData: any = await Users.findByIdAndUpdate(payload.userId, { $inc: { availableAmount: - data.amount } }, { new: true })
      }
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn added"
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

  getTxn = async (req: Request): Promise<ICommonServices> => {
    try {
      let widhrawal: any = req.query?.widhrawal;
      let data: any
      if (widhrawal != undefined) {
        // console.log(widhrawal, "widhrawalwidhrawal");
        data = await TxnModel.find({ status: 0, widhrawal }).sort({ createdAt: -1 }).populate('userId').lean();
      } else
        data = await TxnModel.find({ status: 0 }, { __v: 0, }).sort({ createdAt: -1 }).populate('userId').lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn History found",
            // data: data
            data: data.map((e: any) => { return { _id: e._id, txnNum: e.txnNum, amount: e.amount, userName: e.userId.username, status: e.status } })
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error, "erro");
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  verify = async (req: Request): Promise<ICommonServices> => {
    try {
      // let payload = req.user as IPayAuth;
      let data: any = await TxnModel.find({ txnNum: req.params.txnNum }).lean();
      // let data: any = await TxnModel.find({ txnNum:req.params.txnNum,userId:payload.userId }).lean();
      if (data) {
        // console.log(data);
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

  getTxnByUserId = async (userId: string): Promise<ICommonServices> => {
    try {
      let data: any = await TxnModel.find({ userId }).sort({ createdAt: -1 }).lean();
      if (data) {
        // console.log(data);
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

  getTxnById = async (txnId: string): Promise<ICommonServices> => {
    try {
      let data: any = await TxnModel.findById(txnId).populate('userId').lean();
      if (data) {
        // console.log("datadatadatadata");
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn Details found",
            data: { ...data, userName: data.userId.username, name: data.userId.name, userId: data.userId._id }
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
      let data: any =  await TxnModel.findByIdAndUpdate(id, { $set: { status: 1 } }, { new: true });
      if (data) {
        if (!data?.widhrawal) {          
          let user = await Users.findByIdAndUpdate(data.userId, {
            $inc: {
              availableAmount: data.amount
            }
          }, { new: true })
          if (!user?.paymentStatus) {
            let updatedUser: any = await Users.findByIdAndUpdate(data.userId, { $set: { isPaymentDone: true, status: 1, paymentStatus: 1 } }, { new: true });
            let minAmount = 500;
            if (updatedUser?.uplineId && data.amount > minAmount) {
              let refBounce = 5
              await Users.findByIdAndUpdate(updatedUser.uplineId, {
                $inc: {
                  availableAmount: refBounce
                }
              })
            }
          }
        }
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn approved"
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Not Found" } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  rejectTxn = async (req: Request, id: string): Promise<ICommonServices> => {
    try {
      let data: any = await TxnModel.findByIdAndUpdate(id, { $set: { status: 2 } }, { new: true });
      if (data?.widhrawal) {
        let balance = await Users.findByIdAndUpdate(data.userId, { $inc: { availableAmount: data.amount } }, { new: true })
      }

      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn rejected"
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

