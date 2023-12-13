import { Request, Response, query } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import Funds from "../models/fund";
import Users from "../models/users";

class dataServicesData {

  addFund = async (req: Request): Promise<ICommonServices> => {
    try {
      
      let payload = req.user as IPayAuth;

      let data = await Funds.create(
        {
          userId: payload.userId,
          amount: req.body.amount,
          upi: req.body.upi?req.body.upi:"",
          txnNum: req.body.txnNum,
          widhrawal: req.body.widhrawal
        }
      )


      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Fund Added",
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
  getFunds = async (): Promise<ICommonServices> => {
    try {
      let data = await Funds.find().populate('userId').sort({ createdAt: -1 }).lean()

      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Funds Found",
            data: data.map((e: any) => { return { _id:e._id,txnNum:e.txnNum,amount:e.amount, userName: e.userId?.username,status:e.status } })
          
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
  getFundsById = async (req: Request): Promise<ICommonServices> => {
    try {
      let data = await Funds.find({userId:req.params.userId}).sort({ createdAt: -1 })

      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Funds Found",
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

  approveFunds = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;

      let data:any = await Funds.findByIdAndUpdate(req.params.id, { $set: { status: 1 } }, { new: true })

      let data1 = await Users.findByIdAndUpdate(data.userId ,
        { $inc: { availableAmount: data.amount } }
      )
      if (data1) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Fund Approved",
            // data
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

  rejectFunds = async (req: Request): Promise<ICommonServices> => {
    try {
      let data = await Funds.findByIdAndUpdate(req.params.id, { $set: { status: 2 } }, { new: true })

      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Fund Rejected",
            // data
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

