import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import RewordModel from "../models/reword";

class ServicesData {

  getReword = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let data = await RewordModel.find({ userId: payload.userId }).sort({ createdAt: -1 }).populate('downlineId').limit(70).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Reword History found",
            data: data.map((e: any) => { return { _id: e._id, amount: e.amount, downlineName: e.downlineId.username, oldBalance: e.oldBalance } })
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "data found" } };
      }
    } catch (error) {
      console.log(error, "erro");
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new ServicesData();

