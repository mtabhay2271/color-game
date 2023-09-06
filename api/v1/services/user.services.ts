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

  activateUser = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;

      let plan = parseInt(req.body.plan) == 500 ? 1 : (parseInt(req.body.plan) == 1000 ? 2 : 0);

      const rewordsArray: any = {
        0: [100, 20, 10, 5, 2],
        1: [250, 100, 50, 40, 30],
        2: [500, 200, 100, 80, 60]
      }


      if (payload.role == 'admin') {

        let updatedUser: any = await Users.findOneAndUpdate(
          { username: req.body.username },
          { $set: { isPaymentDone: true, status: 1, plan } },
          { new: true }
        );

        if (updatedUser) {

          let promiseUplinePlans = [];

          // finding uplines plans
          for (let i = 1; i <= 5; i++) {
            const uplineId = updatedUser[`uplineId${i == 1 ? '' : i}`];
            if (uplineId) {
              promiseUplinePlans.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findById(uplineId, { plan: 1 }).lean()
                  );
                })
              );

            }
          }
          let upLinePlans = await Promise.all(promiseUplinePlans);

          let promiseUpdateUpline: any[] = [];
          let amount = 0

          // Loop through upline references and update rewards
          upLinePlans.forEach((e: any, i: number) => {

            //comparing plan with upline and choosing amount accordingly
            let key = plan < e.plan ? plan : e.plan
            amount = rewordsArray[key][i];

            // creating promise for upline updation
            promiseUpdateUpline.push(
              new Promise(function async(resolve, reject) {
                resolve(
                  Users.findByIdAndUpdate(e._id, {
                    $inc: {
                      availableAmount: amount,
                      totalEarning: amount,
                      todayEarning: amount,
                      thisWeekEarning: amount,
                      thisMonthEarning: amount,
                      teamEarning: amount
                    }
                  })
                );
              })
            );
          })


          // Execute all promises for update uplines
          let promiseData2 = await Promise.all(promiseUpdateUpline);
        }

      } else {
        let user: any = await Users.findById(payload.userId)

        if (user?.availableAmount < parseInt(req.body.plan)) {
          return { statusCode: 200, data: { success: false, message: 'Your available amount is less than you plan amount' } };
        } else {
          let updatedActivator: any = await Users.findByIdAndUpdate(payload.userId, { $inc: { availableAmount: -parseInt(req.body.plan) } }, { new: true })


          let updatedUser: any = await Users.findOneAndUpdate(
            { username: req.body.username },
            { $set: { isPaymentDone: true, status: 1, plan } },
            { new: true }
          );

          if (updatedUser) {

            let promiseUplinePlans = [];

            // finding uplines plans
            for (let i = 1; i <= 5; i++) {
              const uplineId = updatedUser[`uplineId${i == 1 ? '' : i}`];
              if (uplineId) {
                promiseUplinePlans.push(
                  new Promise(function async(resolve, reject) {
                    resolve(
                      Users.findById(uplineId, { plan: 1 }).lean()
                    );
                  })
                );

              }
            }
            let upLinePlans = await Promise.all(promiseUplinePlans);


            let promiseUpdateUpline: any[] = [];
            let amount = 0

            // Loop through upline references and update rewards
            upLinePlans.forEach((e: any, i: number) => {

              //comparing plan with upline and choosing amount accordingly
              let key = plan < e.plan ? plan : e.plan
              amount = rewordsArray[key][i];

              // creating promise for upline updation
              promiseUpdateUpline.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(e._id, {
                      $inc: {
                        availableAmount: amount,
                        totalEarning: amount,
                        todayEarning: amount,
                        thisWeekEarning: amount,
                        thisMonthEarning: amount,
                        teamEarning: amount
                      }
                    })
                  );
                })
              );
            })


            // Execute all promises for update uplines
            let promiseData2 = await Promise.all(promiseUpdateUpline);
          }

        }
      }
      return { statusCode: 200, data: { success: true, message: 'User activated succesfully' } };

    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new UserServicesData();

