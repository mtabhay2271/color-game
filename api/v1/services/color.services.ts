import { Request } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import Color from "../models/color";
import Join, { JoinModel } from "../models/color.joined";
import Users from "../models/users";
import Reword from "../models/reword";

class dataServicesData {

  //add result
  add = async () => {
    try {
      const getGames = await Color.find({});

      const resultData1 = await Join.aggregate([
        { $match: { num: getGames.length + 1 } },
        {
          $group: {
            _id: "$color",
            totalAmount: { $sum: "$amount" }
          }
        }
      ]);

      const aggregatedResult = { green: 0, red: 0, yellow: 0 };

      resultData1.forEach((entry) => {
        if (entry._id === 1) {
          aggregatedResult.green = entry.totalAmount * 2;
        } else if (entry._id === 2) {
          aggregatedResult.red = entry.totalAmount * 2;
        } else {
          aggregatedResult.yellow = entry.totalAmount * 5;
        }
      });

      const sortedResult = Object.entries(aggregatedResult).sort(([, v1], [, v2]) => v1 - v2);
      const newArray = sortedResult.filter(e => e[1] === sortedResult[0][1]);
      const result1 = newArray[Math.floor(Math.random() * newArray.length)];

      const resultMapping: any = {
        green: 1,
        red: 2,
        yellow: 3
      };
      const result = resultMapping[result1[0]];

      const data = await Color.create({ result, num: (getGames.length + 1) });
      await Join.updateMany({ num: data.num }, { $set: { result } });

      let dataUser = await Join.find({ color: result, num: data.num }, { userId: 1, amount: 1, taxAmount: 1 })
      ////////////////// 

      const updatePromises = dataUser.map(async (item) => {
        const userId = item.userId;
        let userAmount = item.amount; // The amount value from Join collection
        // Update the userAmount based on the color
        if (result === 1) {
          userAmount *= 2;
        } else if (result === 2) {
          userAmount *= 2;
        } else if (result === 3) {
          userAmount *= 5;
        }
        
        let actualAmount=Math.floor((userAmount - item.taxAmount));
        // Update the amount for the user using userId and updated userAmount
        return Users.findByIdAndUpdate(userId,
          { $inc: { totalEarning: actualAmount, earningAmount: actualAmount } }
        );
      }); 
      const updateResults = await Promise.all(updatePromises);
      return { statusCode: 200, data: { success: false, message: "Result found" } };

    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_ISE } };
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

      // console.log(req.user);
      let payload = req.user as IPayAuth;
      let user = await Users.findById(payload.userId, { availableAmount: 1 }).lean();
      if (user && user?.availableAmount < req.body.amount) {
        return { statusCode: 200, data: { success: false, message: "Your Balance is less" } };
      } else {
        const texPercentage = 5
        const ptgArray = [30, 20, 10]
        let charges = (req.body.amount * texPercentage) / 100;

        let getGames = await Color.find({});
        let data: any = await Join.create({ ...req.body, userId: payload.userId, num: (getGames.length + 1), taxAmount: charges });
        let data1: any
        if (user) {
          let user = await Users.findByIdAndUpdate(payload.userId, { $inc: { availableAmount: - data.amount } }, { new: true });
          console.log(payload?.uplineId);

          if (payload?.uplineId) {
            console.log(payload?.uplineId);
            let rewordArray = [((charges * ptgArray[0]) / 100), ((charges * ptgArray[1]) / 100), ((charges * ptgArray[2]) / 100)];

            let promiseUplineReword = [];
            promiseUplineReword.push(
              new Promise(function async(resolve, reject) {
                resolve(
                  Users.findByIdAndUpdate(payload.uplineId, { $inc: { earningAmount: rewordArray[0], totalEarning: rewordArray[0] } }, { new: true })
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
              console.log(payload?.uplineId2);

              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(payload.uplineId2, { $inc: { earningAmount: rewordArray[1], totalEarning: rewordArray[1] } }, { new: true })
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
                      Users.findByIdAndUpdate(payload.uplineId3, { $inc: { earningAmount: rewordArray[2], totalEarning: rewordArray[2] } }, { new: true })
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

  getJoinList = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;

      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      let data = await Join.find({
        userId: payload.userId,
        createdAt: {
          $gte: startOfDay
        }
      }, { __v: 0, updatedAt: 0 }).sort({ createdAt: -1 }).lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "User game list found",
            data: data
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

