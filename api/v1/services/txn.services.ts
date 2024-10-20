import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import TxnModel from "../models/txn";
import Users from "../models/users";
import Reword from "../models/reword";

class dataServicesData {
  //using
  addTxn = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      //%%%
      let data: any = await TxnModel.create({
        ...req.body,
        userId: payload.userId,
        pay: req.body.widhrawal
          ? req.body.amount - (req.body.amount * 5) / 100
          : 0,
      });
      if (data.widhrawal) {
        let userData: any = await Users.findByIdAndUpdate(
          payload.userId,
          { $inc: { availableAmount: -data.amount } },
          { new: true }
        );
      }
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn added",
          },
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.USER_DETAILS_FOUND_NOT,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  //using
  getTxn = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let data: any;
      let query: any = { userId: payload.userId };
      let status: any = req.params.status;
      if (status && status != 4) {
        query["status"] = status;
      }
      data = await TxnModel.find(query)
        .sort({ createdAt: -1 })
        .populate("userId")
        .lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn List found",
            data: data.map((e: any) => {
              return {
                _id: e._id,
                txnNum: e.txnNum,
                amount: e.amount,
                userName: e?.userId?.username,
                status: e.status,
              };
            }),
          },
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.USER_DETAILS_FOUND_NOT,
          },
        };
      }
    } catch (error) {
      console.log(error, "erro");
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
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
            data,
          },
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.USER_DETAILS_FOUND_NOT,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  //using
  getTxnByUserId = async (
    userId: string,
    status: any
  ): Promise<ICommonServices> => {
    try {
      let data: any;
      let query: any = { userId };
      if (status && status != 4) {
        query["status"] = status;
      }
      data = await TxnModel.find(query)
        .sort({ createdAt: -1 })
        .populate("userId")
        .lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn List found",
            data: data.map((e: any) => {
              return {
                ...e,
                userName: e?.userId?.username,
                userId: e?.userId?._id,
              };
            }),
          },
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.USER_DETAILS_FOUND_NOT,
          },
        };
      }
    } catch (error) {
      console.log(error, "erro");
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  //using
  approveTxn = async (req: Request, id: string): Promise<ICommonServices> => {
    try {
      let data: any = await TxnModel.findByIdAndUpdate(
        id,
        { $set: { status: 1 } },
        { new: true }
      );
      if (data) {
        if (!data?.widhrawal) {
          let actualAmount =
            data.amount < 1000
              ? data.amount
              : data.amount < 10000
              ? data.amount + ((data.amount * 10) / 100)
              : data.amount + ((data.amount * 15) / 100);
          let user = await Users.findByIdAndUpdate(
            data.userId,
            {
              $inc: {
                availableAmount: actualAmount,
                rechargedAmount: actualAmount,
              },
            },
            { new: true }
          );
          if (!user?.paymentStatus) {
            let updatedUser: any = await Users.findByIdAndUpdate(
              data.userId,
              { $set: { isPaymentDone: true, status: 1, paymentStatus: 1 } },
              { new: true }
            );
            let minAmount = 500;

            const ptgArray = [10, 1, 1, 1, 1];
            let rewordArray = [
              (data.amount * ptgArray[0]) / 100,
              (data.amount * ptgArray[1]) / 100,
              (data.amount * ptgArray[2]) / 100,
              (data.amount * ptgArray[3]) / 100,
              (data.amount * ptgArray[4]) / 100,
            ];

            let promiseUplineReword = [];

            if (updatedUser?.uplineId) {
              // if (updatedUser?.uplineId && data.amount >= minAmount) {
              //%%%
              // let refBounce = (data.amount * 10) / 100;
              // await Users.findByIdAndUpdate(updatedUser.uplineId, {
              //   $inc: {
              //     availableAmount: refBounce,
              //   },
              // });

              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(
                      updatedUser.uplineId,
                      {
                        $inc: {
                          availableAmount: rewordArray[0],
                          totalEarning: rewordArray[0],
                        },
                      },
                      { new: true }
                    )
                  );
                })
              );
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Reword.create({
                      downlineId: updatedUser._id,
                      userId: updatedUser.uplineId,
                      amount: rewordArray[0],
                      // oldBalance: user?.availableAmount
                    })
                  );
                })
              );
            }

            if (updatedUser?.uplineId2) {
              console.log(updatedUser?.uplineId2);

              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(
                      updatedUser.uplineId2,
                      {
                        $inc: {
                          availableAmount: rewordArray[1],
                          totalEarning: rewordArray[1],
                        },
                      },
                      { new: true }
                    )
                  );
                })
              );
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Reword.create({
                      downlineId: updatedUser._id,
                      userId: updatedUser.uplineId2,
                      amount: rewordArray[1],
                      // oldBalance: user?.availableAmount
                    })
                  );
                })
              );
            }
            if (updatedUser?.uplineId3) {
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(
                      updatedUser.uplineId3,
                      {
                        $inc: {
                          availableAmount: rewordArray[2],
                          totalEarning: rewordArray[2],
                        },
                      },
                      { new: true }
                    )
                  );
                })
              );
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Reword.create({
                      downlineId: updatedUser._id,
                      userId: updatedUser.uplineId3,
                      amount: rewordArray[2],
                      // oldBalance: user?.availableAmount
                    })
                  );
                })
              );
            }

            if (updatedUser?.uplineId4) {
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(
                      updatedUser.uplineId4,
                      {
                        $inc: {
                          availableAmount: rewordArray[3],
                          totalEarning: rewordArray[3],
                        },
                      },
                      { new: true }
                    )
                  );
                })
              );
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Reword.create({
                      downlineId: updatedUser._id,
                      userId: updatedUser.uplineId4,
                      amount: rewordArray[3],
                      // oldBalance: user?.availableAmount
                    })
                  );
                })
              );
            }

            if (updatedUser?.uplineId5) {
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Users.findByIdAndUpdate(
                      updatedUser.uplineId5,
                      {
                        $inc: {
                          availableAmount: rewordArray[4],
                          totalEarning: rewordArray[4],
                        },
                      },
                      { new: true }
                    )
                  );
                })
              );
              promiseUplineReword.push(
                new Promise(function async(resolve, reject) {
                  resolve(
                    Reword.create({
                      downlineId: updatedUser._id,
                      userId: updatedUser.uplineId5,
                      amount: rewordArray[4],
                      // oldBalance: user?.availableAmount
                    })
                  );
                })
              );
            }
            let upLineReword = await Promise.all(promiseUplineReword);
          }
        }
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn approved",
          },
        };
      } else {
        return {
          statusCode: 200,
          data: { success: false, message: "Not Found" },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  //using
  rejectTxn = async (req: Request, id: string): Promise<ICommonServices> => {
    try {
      let data: any = await TxnModel.findByIdAndUpdate(
        id,
        { $set: { status: 2 } },
        { new: true }
      );
      if (data?.widhrawal) {
        //%%%
        let refBounce = (data.amount * 5) / 100;
        let balance = await Users.findByIdAndUpdate(
          data.userId,
          { $inc: { availableAmount: data.amount + refBounce } },
          { new: true }
        );
      }

      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn rejected",
          },
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.USER_DETAILS_FOUND_NOT,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  //using
  getTxnByStatus = async (status: any): Promise<ICommonServices> => {
    try {
      let data: any;
      let query: any = {};
      if (status && status != 4) {
        query["status"] = status;
      }
      data = await TxnModel.find(query)
        .sort({ createdAt: -1 })
        .populate("userId")
        .lean();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Txn List found",
            data: data.map((e: any) => {
              return {
                _id: e._id,
                txnNum: e.txnNum,
                amount: e.amount,
                userName: e?.userId?.username,
                status: e.status,
              };
            }),
          },
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.USER_DETAILS_FOUND_NOT,
          },
        };
      }
    } catch (error) {
      console.log(error, "erro");
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };
}
export default new dataServicesData();
