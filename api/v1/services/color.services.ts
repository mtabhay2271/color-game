import { Request } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import Color from "../models/color";
import Join, { JoinModel } from "../models/joined";
import Users from "../models/users";
import Reword from "../models/reword";

class dataServicesData {

  add = async (req: Request): Promise<ICommonServices> => {
    try {

      let getGames = await Color.find({});
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
          aggregatedResult.green = entry.totalAmount * 2;
        } else if (entry._id === 2) {
          aggregatedResult.red = entry.totalAmount * 3;
        } else {
          aggregatedResult.yellow = entry.totalAmount * 5;
        }
      });

      console.log(aggregatedResult);

      let sortedResult = Object.entries(aggregatedResult).sort(([, v1], [, v2]) => v1 - v2);
      let result = 1;
      let newArray = sortedResult.filter(e => { return e[1] == sortedResult[0][1] })
      let result1 = newArray[Math.floor(Math.random() * newArray.length)];

      if (result1[0] == 'green') {
        result = 1;
      } else if (result1[0] == 'red') {
        result = 2;
      } else {
        result = 3;
      }
      let data: any = await Color.create({ result, num: (getGames.length + 1) });
      let joinResult: any = await Join.updateMany({ num: data.num }, { $set: { result } });
      console.log(joinResult, "joinResult")
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
      let data: any = await Color.find({}, { num: 1, result: 1 }).sort({ num: -1 }).limit(50).lean();
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

      console.log(req.user);
      let payload = req.user as IPayAuth;
      let user = await Users.findById(payload.userId, { availableAmount: 1 }).lean();
      if (user && user?.availableAmount < req.body.amount) {
        return { statusCode: 200, data: { success: false, message: "Your Balance is less" } };
      } else {
        let getGames = await Color.find({});
        let data: any = await Join.create({ ...req.body, userId: payload.userId, num: (getGames.length + 1) });
        let data1: any
        if (user) {
          let user = await Users.findByIdAndUpdate(payload.userId, { $inc: { availableAmount: - data.amount } }, { new: true });

          if (payload?.uplineId) {
            const texPercentage = 5
            const ptgArray = [30, 20, 10]

            let charges = (data.amount * texPercentage) / 100;
            let rewordArray = [((charges * ptgArray[0]) / 100), ((charges * ptgArray[1]) / 100), ((charges * ptgArray[2]) / 100)];

            let promiseUplineReword = [];
            promiseUplineReword.push(
              new Promise(function async(resolve, reject) {
                resolve(
                  Users.findByIdAndUpdate(payload.uplineId, { $inc: { availableAmount: rewordArray[0] } }, { new: true })
                );
              })
            );
            promiseUplineReword.push(
              new Promise(function async(resolve, reject) {
                resolve(
                  Reword.create({
                    downlineId: payload.userId,
                    userId: payload.uplineId,
                    amount: rewordArray[0],
                    // oldBalance: user?.availableAmount
                  })
                );
              })
            );
            if (payload?.uplineId2) {
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(payload.uplineId2, { $inc: { availableAmount: rewordArray[1] } }, { new: true })
                  );
                })
              );
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Reword.create({
                      downlineId: payload.userId,
                      userId: payload.uplineId2,
                      amount: rewordArray[1],
                      // oldBalance: user?.availableAmount
                    })
                  );
                })
              );

              if (payload?.uplineId3) {
                promiseUplineReword.push(
                  new Promise(function async(resolve, reject) {
                    resolve(
                      Users.findByIdAndUpdate(payload.uplineId3, { $inc: { availableAmount: rewordArray[2] } }, { new: true })
                    );
                  })
                );
                promiseUplineReword.push(
                  new Promise(function async(resolve, reject) {
                    resolve(
                      Reword.create({
                        downlineId: payload.userId,
                        userId: payload.uplineId3,
                        amount: rewordArray[2],
                        // oldBalance: user?.availableAmount
                      })
                    );
                  })
                );
              }
            }
            let upLineReword = await Promise.all(promiseUplineReword);
            data1 = upLineReword;
          }
          return {
            statusCode: 200,
            data: {
              success: true,
              message: "Join successfully",
              data: data1
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

