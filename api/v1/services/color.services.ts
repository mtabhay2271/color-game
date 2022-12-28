import { Request } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { AddColor } from "../view_model/commondata";
import Color from "../models/color";
import Join, { JoinModel } from "../models/joined";
import Users from "../models/users";

class dataServicesData {

  add = async (req: Request): Promise<ICommonServices> => {
    try {
      let getGames = await Color.find({});
      let FoundJoin = await Join.find({ num: (getGames.length + 1) })
      console.log(FoundJoin.length);
      let resultData = { red: 0, green: 0, yellow: 0 }
      if (FoundJoin) {
        FoundJoin.forEach((e: JoinModel) => {
          if (e.color == 1) {
            resultData.green = resultData.green + e.amount;
          } else if (e.color == 2) {
            resultData.red = resultData.red + e.amount;
          } else {
            resultData.yellow = resultData.yellow + e.amount;
          }
        })
      }
      let sortedResult = Object.entries(resultData).sort(([, v1], [, v2]) => v1 - v2);
      let result = 1;
      if (sortedResult[0][0] == 'green') {
        result = 1;
      } else if (sortedResult[0][0] == 'red') {
        result = 2;
      } else {
        result = 3;
      }
      let data: any = await Color.create({ result, num: (getGames.length + 1) });
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Color added successfully",
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
      let data: any = await Color.find({}, { num: 1, result: 1 }).sort({ num: -1 }).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "list found successfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Color list not found successfully" } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  join = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let user = await Users.findById(payload.userId, { availabelAmount: 1 }).lean();

      let getGames = await Color.find({});
      let data: any = await Join.create({ ...req.body, userId: payload.userId, num: (getGames.length + 1) });
      if (user) {
        let balance = await Users.findByIdAndUpdate(payload.userId, { $set: { availabelAmount: user.availabelAmount - data.amount } }, { new: true })
      }
      // console.log("dddddddddd", data);

      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Join successfully",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: "Not Joined" } };
      }

    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new dataServicesData();

