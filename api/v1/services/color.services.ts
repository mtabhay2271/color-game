import { Request } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { AddColor } from "../view_model/commondata";
import Color from "../models/color";
import Join, { JoinModel } from "../models/joined";
import Users from "../models/users";
import { ContactUsModel } from "../models/contactUS";

class dataServicesData {

  add = async (req: Request): Promise<ICommonServices> => {
    try {
      // console.log("addddddddddddddddddd")

      let getGames = await Color.find({});
      // let FoundJoin = await Join.find({ num: (getGames.length + 1) })
      // // console.log(FoundJoin.length,"FoundJoin.length",FoundJoin);
      // let resultData = { green: 0, red: 0, yellow: 0 }
      // if (FoundJoin) {
      //   // console.log("11111111")
      //   FoundJoin.forEach((e: JoinModel) => {
      //     if (e.color == 1) {
      //       resultData.green = resultData.green + e.amount;
      //     } else if (e.color == 2) {
      //       resultData.red = resultData.red + e.amount;
      //     } else {
      //       resultData.yellow = resultData.yellow + e.amount;
      //     }
      //   })
      // }
      // console.log(resultData);

      const resultData1 = await Join.aggregate([
        { $match: { num: getGames.length + 1 } },
        {
          $group: {
            _id: "$color",
            totalAmount: { $sum: "$amount" }
          }
        }
      ]);

      // Process the aggregation results to construct the desired result format
      const aggregatedResult = { green: 0, red: 0, yellow: 0 };

      resultData1.forEach((entry) => {
        if (entry._id === 1) {
          aggregatedResult.green = entry.totalAmount*2;
        } else if (entry._id === 2) {
          aggregatedResult.red = entry.totalAmount*3;
        } else {
          aggregatedResult.yellow = entry.totalAmount*5;
        }
      });

      console.log(aggregatedResult);

      let sortedResult = Object.entries(aggregatedResult).sort(([, v1], [, v2]) => v1 - v2);
      let result = 1;
      // console.log("sortedResult", sortedResult);
      let newArray = sortedResult.filter(e => { return e[1] == sortedResult[0][1] })
      // console.log("newArray", newArray);
      // sortedResult.pop();
      let result1 = newArray[Math.floor(Math.random() * newArray.length)];
      //  console.log("result1",result1,"sortedResult",sortedResult)

      if (result1[0] == 'green') {
        result = 1;
      } else if (result1[0] == 'red') {
        result = 2;
      } else {
        result = 3;
      }
      let data: any = await Color.create({ result, num: (getGames.length + 1) });
      // console.log(data,"data")
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
      // console.log("joinnnnnnnnnnnnn")

      let payload = req.user as IPayAuth;
      let user = await Users.findById(payload.userId, { availabelAmount: 1 }).lean();
      if (user && user?.availabelAmount < req.body.amount) {
        return { statusCode: 200, data: { success: false, message: "Your Balance is less" } };
      } else {
        let getGames = await Color.find({});
        let data: any = await Join.create({ ...req.body, userId: payload.userId, num: (getGames.length + 1) });
        if (user) {
          let balance = await Users.findByIdAndUpdate(payload.userId, { $set: { availabelAmount: user.availabelAmount - data.amount } }, { new: true })
        }
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
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new dataServicesData();

