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

  // addTxn = async (req: Request, reqData: TxnViewModel): Promise<ICommonServices> => {
  //   try {
  //     let payload = req.user as IPayAuth;
  //     let data: any = await TxnModel.create({ ...reqData, userId: payload.userId });
  //     if (data.widhrawal) {
  //       let userData: any = await Users.findByIdAndUpdate(payload.userId, { $inc: { availableAmount: - data.amount } }, { new: true })
  //     }
  //     if (data) {
  //       return {
  //         statusCode: 200,
  //         data: {
  //           success: true,
  //           message: "Txn added",
  //           data
  //         }
  //       };
  //     } else {
  //       return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
  //     }
  //   } catch (error) {
  //     // console.log(error);
  //     return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
  //   }
  // };

  getTxn = async (req: Request): Promise<ICommonServices> => {
    try {
      let widhrawal: any = req.query?.widhrawal;
      let data: any
      if (widhrawal != undefined) {
        // console.log(widhrawal, "widhrawalwidhrawal");
        data = await TxnModel.find({ status: 0, widhrawal }).sort({ createdAt: -1 }).populate('userId').lean();
      } else
        data = await TxnModel.find({ status: 0 },{__v:0,}).sort({ createdAt: -1 }).populate('userId').lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn History found",
            // data: data
            data: data.map((e: any) => { return { _id:e._id,txnNum:e.txnNum,amount:e.amount, userName: e.userId.username,status:e.status } })
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
            data:{ ...data, userName: data.userId.username, name: data.userId.name, userId: data.userId._id }
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

  //old code
  // approveTxn = async (req: Request, id: string): Promise<ICommonServices> => {
  //   try {
  //     // let payload = req.user as IPayAuth;
  //     // let user = await Users.findById(payload.userId).lean();

  //     let data: any = await TxnModel.findById(id);
  //     // console.log(user,"user<<<<<");


  //     if (data) {
  //       if (data?.widhrawal) {
  //         let foundUser: any = await Users.findById(data.userId, { availableAmount: 1 }, { new: true });
  //         if (foundUser?.availableAmount > data.amount) {
  //           // let updatedUser = await Users.findByIdAndUpdate(data.userId, { $inc: { availableAmount: -data.amount } }, { new: true });
  //           let approvedData: any = await TxnModel.findByIdAndUpdate(id, { $set: { status: 1 } }, { new: true });
  //         } else {
  //           data = await TxnModel.findByIdAndUpdate(id, { $set: { status: 2 } }, { new: true });
  //         }
  //       } else {
  //         data = await TxnModel.findByIdAndUpdate(id, { $set: { status: 1 } }, { new: true });
  //         let updatedUser: any = await Users.findByIdAndUpdate(data.userId, { $set: { isPaymentDone: true, plan: data.amount == 500 ? 1 : (data.amount == 1000 ? 2 : 0) } });

  //         let str1 = updatedUser.createdAt.toString();
  //         let str2 = data.createdAt.toString();


  //         // if (!updatedUser.isPaymentDone) {

  //         if (updatedUser) {
  //           // console.log("111111");
  //           let plan = updatedUser.plan
  //           let promiseArray = [];
  //           if (updatedUser?.uplineId) {
  //             let uplineId = updatedUser.uplineId
  //             if (str1.substring(0, 15) == str2.substring(0, 15)) {
  //               // matching date
  //               let updatedUser: any = await Users.findByIdAndUpdate(uplineId, {
  //                 $inc: {
  //                   todayRefLead: 1,
  //                   thisMonthRefLead: 1
  //                 }
  //               });
  //             } else if ((str1.substring(11, 15)) == (str2.substring(11, 15))) {
  //               //matching month
  //               if ((str1.substring(4, 7)) ==
  //                 (str2.substring(4, 7))) {
  //                 let updatedUser: any = await Users.findByIdAndUpdate(uplineId, {
  //                   $inc: {
  //                     thisMonthRefLead: 1
  //                   }
  //                 });
  //               }
  //             }
  //             let amount = plan == 1 ? 150 : (plan == 2 ? 400 : 100);
  //             promiseArray.push(
  //               new Promise(function (resolve, reject) {
  //                 resolve(Users.findByIdAndUpdate(uplineId, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount } }))
  //               })
  //             )
  //           }
  //           if (updatedUser?.uplineId2) {
  //             let uplineId2 = updatedUser.uplineId2;
  //             let amount = plan == 1 ? 30 : (plan == 2 ? 70 : 20);
  //             promiseArray.push(
  //               new Promise(function (resolve, reject) {
  //                 resolve(Users.findByIdAndUpdate(uplineId2, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
  //               })
  //             )
  //           }
  //           if (updatedUser?.uplineId3) {
  //             let uplineId3 = updatedUser.uplineId3;
  //             let amount = plan == 1 ? 20 : (plan == 2 ? 50 : 10);
  //             promiseArray.push(
  //               new Promise(function (resolve, reject) {
  //                 resolve(Users.findByIdAndUpdate(uplineId3, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
  //               })
  //             )
  //           }
  //           if (updatedUser?.uplineId4) {
  //             let uplineId4 = updatedUser.uplineId4;
  //             let amount = plan == 1 ? 10 : (plan == 2 ? 25 : 5);
  //             promiseArray.push(
  //               new Promise(function (resolve, reject) {
  //                 resolve(Users.findByIdAndUpdate(uplineId4, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
  //               })
  //             )
  //           }
  //           if (updatedUser?.uplineId5) {
  //             let uplineId5 = updatedUser.uplineId5;
  //             let amount = plan == 1 ? 5 : (plan == 2 ? 12 : 2);
  //             promiseArray.push(
  //               new Promise(function (resolve, reject) {
  //                 resolve(Users.findByIdAndUpdate(uplineId5, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
  //               })
  //             )
  //           }
  //           let promiseData = await Promise.all(promiseArray);
  //         }
  //         // }
  //       }
  //       return {
  //         statusCode: 200,
  //         data: {
  //           success: true,
  //           message: "Txn approved",
  //           data
  //         }
  //       };
  //     } else {
  //       return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
  //   }
  // };


  approveTxn = async (req: Request, id: string): Promise<ICommonServices> => {
    try {
      // let payload = req.user as IPayAuth;
      // let user = await Users.findById(payload.userId).lean();
      let data: any = await TxnModel.findById(id);
      if (data) {
        if (data?.widhrawal) {
          let foundUser: any = await Users.findById(data.userId, { availableAmount: 1 }, { new: true });
          if (foundUser?.availableAmount > data.amount) {
            // let updatedUser = await Users.findByIdAndUpdate(data.userId, { $inc: { availableAmount: -data.amount } }, { new: true });
            let approvedData: any = await TxnModel.findByIdAndUpdate(id, { $set: { status: 1 } }, { new: true });
          } else {
            data = await TxnModel.findByIdAndUpdate(id, { $set: { status: 2 } }, { new: true });
          }
        } else {
          data = await TxnModel.findByIdAndUpdate(id, { $set: { status: 1 } }, { new: true });

          let plan = parseInt(data.amount) == 500 ? 1 : (parseInt(data.amount) == 1000 ? 2 : 0);

          let updatedUser: any = await Users.findByIdAndUpdate(data.userId, { $set: { isPaymentDone: true,status: 1, plan } }, { new: true });

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

            // console.log(upLinePlans);

            const rewordsArray: any = {
              0: [100, 20, 10, 5, 2],
              1: [250, 100, 50, 40, 30],
              2: [500, 200, 100, 80, 60]
            }
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

          // let str1 = updatedUser.createdAt.toString();
          // let str2 = data.createdAt.toString();

          // // plan amount distibution
          // let amountD: any = []
          // if (plan == "500")
          //   amountD = [250, 100, 50, 40, 30];
          // else if (plan == "1000")
          //   amountD = [500, 200, 100, 80, 60];
          // else if (plan == "0")
          //   amountD = [100, 20, 10, 5, 2];

          // if (updatedUser) {
          //   let plan = updatedUser.plan
          //   let promiseArray = [];
          //   if (updatedUser?.uplineId) {
          //     let uplineId = updatedUser.uplineId
          //     if (str1.substring(0, 15) == str2.substring(0, 15)) {
          //       // matching date
          //       let updatedUser: any = await Users.findByIdAndUpdate(uplineId, {
          //         $inc: {
          //           todayRefLead: 1,
          //           thisMonthRefLead: 1
          //         }
          //       });
          //     } else if ((str1.substring(11, 15)) == (str2.substring(11, 15))) {
          //       //matching month
          //       if ((str1.substring(4, 7)) ==
          //         (str2.substring(4, 7))) {
          //         let updatedUser: any = await Users.findByIdAndUpdate(uplineId, {
          //           $inc: {
          //             thisMonthRefLead: 1
          //           }
          //         });
          //       }
          //     }
          //     // let amount = plan == 1 ? 150 : (plan == 2 ? 400 : 100);
          //     let amount = amountD[0]
          //     promiseArray.push(
          //       new Promise(function (resolve, reject) {
          //         resolve(Users.findByIdAndUpdate(uplineId, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount } }))
          //       })
          //     )
          //   }
          //   if (updatedUser?.uplineId2) {
          //     let uplineId2 = updatedUser.uplineId2;
          //     // let amount = plan == 1 ? 30 : (plan == 2 ? 70 : 20);
          //     let amount = amountD[1]
          //     promiseArray.push(
          //       new Promise(function (resolve, reject) {
          //         resolve(Users.findByIdAndUpdate(uplineId2, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
          //       })
          //     )
          //   }
          //   if (updatedUser?.uplineId3) {
          //     let uplineId3 = updatedUser.uplineId3;
          //     let amount = amountD[2]
          //     // let amount = plan == 1 ? 20 : (plan == 2 ? 50 : 10);
          //     promiseArray.push(
          //       new Promise(function (resolve, reject) {
          //         resolve(Users.findByIdAndUpdate(uplineId3, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
          //       })
          //     )
          //   }
          //   if (updatedUser?.uplineId4) {
          //     let uplineId4 = updatedUser.uplineId4;
          //     // let amount = plan == 1 ? 10 : (plan == 2 ? 25 : 5);
          //     let amount = amountD[3]
          //     promiseArray.push(
          //       new Promise(function (resolve, reject) {
          //         resolve(Users.findByIdAndUpdate(uplineId4, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
          //       })
          //     )
          //   }
          //   if (updatedUser?.uplineId5) {
          //     let uplineId5 = updatedUser.uplineId5;
          //     // let amount = plan == 1 ? 5 : (plan == 2 ? 12 : 2);
          //     let amount = amountD[4]

          //     promiseArray.push(
          //       new Promise(function (resolve, reject) {
          //         resolve(Users.findByIdAndUpdate(uplineId5, { $inc: { availableAmount: amount, totalEarning: amount, todayEarning: amount, thisWeekEarning: amount, thisMonthEarning: amount, teamEarning: amount } }))
          //       })
          //     )
          //   }
          //   let promiseData = await Promise.all(promiseArray);
          // }
        }
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn approved",
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

  rejectTxn = async (req: Request, id: string): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let user = await Users.findById(payload.userId, { availableAmount: 1 }).lean();

      let data: any = await TxnModel.findByIdAndUpdate(id, { $set: { status: 2 } }, { new: true });

      if (user) {
        let balance = await Users.findByIdAndUpdate(payload.userId, { $inc: { availableAmount: data.amount } }, { new: true })
      }

      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn rejected",
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


}
export default new dataServicesData();

