import { Request } from "express";
import { ICommonServices, IPayAuth, IUser } from "../interfaces/response_interfaces";
import Users, { UserModel } from "../models/users";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { PaymentRefViewModel } from "../view_model/users";
import { processing } from "../common/constants/paymentStatus.constants";

class UserServicesData {

  userDetails = async (userId: string): Promise<ICommonServices> => {
    try {
      let user: any = await Users.findById(userId, { password: 0 }).populate("uplineId").lean();
      let downline: any = await Users.find({ uplineId: userId }).count();
      if (user) {
        // console.log(user);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.USER_DETAILS_FOUND,
            data: {
              ...user,
              uplineName: user.uplineId ? user.uplineId.name : '',
              uplineUserName: user.uplineId ? user.uplineId.username : '',
              uplineId: user.uplineId ? user.uplineId._id : '',
              downlineCount: downline,
              totalEarning: 50,
              thisMonthEarning: 10,
            }
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

  addPaymentRefNumber = async (req: Request, reqBodyData: PaymentRefViewModel): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      // console.log(payload, "<<<<payload", reqBodyData);
      let user = await Users.findOne({ paymentRefNumber: reqBodyData.paymentRefNumber }).lean();
      if (!user) {
        let result = await Users.findByIdAndUpdate(payload.userId,
          {
            $set: {
              paymentRefNumber: reqBodyData.paymentRefNumber,
              paymentStatus: processing,
            },
          }
        );
        if (result) {
          return {
            statusCode: 200,
            data: { success: true, message: "payment status updated" }
          };
        } else {
          return {
            statusCode: 200,
            data: { success: false, message: "error" }
          };
        }

      } else {
        return {
          statusCode: 400,
          data: { success: false, message: "Please enter valid Ref Number" }
        };
      }

    } catch (err) {
      // console.log(err);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_ISE }
      };
    }
  };

  getUserList = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Users.find().sort({ createdAt: -1 }).lean();
      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "User list found",
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
  userByUsername = async (username: string): Promise<ICommonServices> => {
    try {
      // let payload = req.user as IPayAuth;
      let user = await Users.findOne({ username }).lean();
      if (user) {
        // console.log(user);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "User found",
            data: user
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_FOUND_NOT } };
      }

    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  }
  userById = async (userId: string): Promise<ICommonServices> => {
    try {
      // let payload = req.user as IPayAuth;
      let user = await Users.findById(userId).lean();
      if (user) {
        // console.log(user);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "User found",
            data: user
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_FOUND_NOT } };
      }

    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  }

  getUserMaxEarning = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Users.find({}, { name: 1, totalEarning: 1 }).sort({ totalEarning: -1 }).limit(10).lean();
      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "User list found",
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

  filter = async (req: Request): Promise<ICommonServices> => {
    try {
      let data: any = await Users.aggregate([
        {
          $match: {
            username: req.query.search
          }
        }
      ])
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "User list found",
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

  transferBalance = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let sender = await Users.findByIdAndUpdate(payload?.userId, { $inc: { earningAmount: - req.body.amount, availableAmount: +(req.body.amount - ((req.body.amount * 1) / 100)) } }, { new: true })
      return { statusCode: 200, data: { success: true, message: 'Money has succesfully added.' } };

    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new UserServicesData();

