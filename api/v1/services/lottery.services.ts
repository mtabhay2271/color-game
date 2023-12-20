import _ from "lodash";
import { Request } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import responseMessages from "../common/response.messages";
import Lottery from "../models/lottery";
import JoinLottery from "../models/lottery.joined";
import Users from "../models/users";
import Reword from "../models/reword";

class dataServicesData {

  //add result
  add = async () => {
    try {
      console.log("'>>>>>>>>>>iiiiii");
      
      // number of games
      const numberCount = 10
      const getGames = await Lottery.find({});

      let resultData1: any = await JoinLottery.find({ num: getGames?.length + 1 }, { choosenNum: 1 });
      let joinedNum = [...new Set(resultData1.map((item: any) => item.choosenNum))];
      // let joinedIds = [...new Set(resultData1.map((item: any) => item._id))];
      // console.log("joinedNum>>",joinedNum);
      const missingNumbers = [];

      for (let i = 1; i <= numberCount; i++) {
        if (!joinedNum.includes(i)) {
          missingNumbers.push(i);
        }
      }
      // console.log('missingNumbers>>>',missingNumbers);
      let resultNum
      if (missingNumbers.length) {
        const randomIndex = Math.floor(Math.random() * missingNumbers.length);
        // Get the random missing number
        resultNum = missingNumbers[randomIndex];
        // console.log('resultNum>>>',resultNum);

      } else {
        const result = await JoinLottery.aggregate([
          { $match: { num: getGames.length + 1 } },
          {
            $group: {
              _id: '$choosenNum',
              totalAmount: { $sum: '$amount' }
            }
          },
          {
            $sort: { totalAmount: 1 } // Sort by totalAmount in ascending order
          },
          {
            $limit: 1 // Get the number with the least totalAmount
          }
        ]);
        resultNum = result[0]._id
        // console.log('result>>>',result);
      }

      let data = await Lottery.create({ num: getGames?.length ? getGames?.length + 1 : 1, result: resultNum });
      await JoinLottery.updateMany({ num: data.num }, { $set: { result: data?.result } })

      let dataUser = await JoinLottery.find({ choosenNum: data.result, num: data.num }, { userId: 1, amount: 1, taxAmount: 1 })
      //////////////////

      const updatePromises = dataUser.map(async (item) => {
        const userId = item.userId;
        let userAmount = item.amount; // The amount value from JoinLottery collection
        // Update the userAmount based on the color        
        // console.log('userAmount>>>',userAmount);
        userAmount *= numberCount;
        let actualAmount = Math.floor((userAmount - item.taxAmount));
        // console.log('actualAmount>>>',actualAmount);

        // Update the amount for the user using userId and updated userAmount
        return Users.findByIdAndUpdate(userId,
          { $inc: { totalEarning: actualAmount, earningAmount: actualAmount } }
        );
      });
      const updateResults = await Promise.all(updatePromises);

      return { statusCode: 200, data: { success: false, data: resultNum, message:  "Result found" } };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_ISE } };
    }
  };

  get = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Lottery.find({}, { num: 1, result: 1 }).sort({ num: -1 }).limit(50).lean();
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
        return { statusCode: 200, data: { success: false, message: "Lottery list not found successfully" } };
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

        let getGames = await Lottery.find({});
        let data: any = await JoinLottery.create({ ...req.body, userId: payload.userId, num: (getGames.length + 1), taxAmount: charges });
        console.log(req.body, "<<<");
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
              message: "Join Lottery successfully",
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
      let data = await JoinLottery.find({
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

