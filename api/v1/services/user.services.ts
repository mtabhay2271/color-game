// import { Request } from "express";
// import { ICommonServices, IPayAuth, IUser } from "../interfaces/response_interfaces";
// import Users, { UserModel } from "../models/users";
// import _ from "lodash";
// import responseMessages from "../common/response.messages";
// import { IUserDetails } from "../interfaces/user";
// import Downline from "../models/downlines";
// import { PaymentRefViewModel } from "../view_model/users";
// import { processing } from "../common/constants/paymentStatus.constants";

// class UserServicesData {

//   userDetails = async (userId: string): Promise<ICommonServices> => {
//     try {
//       let user: any = await Users.findById(userId, { password: 0 }).populate("uplineId").lean();
//       let downline: any = await Downline.find({ uplineId: userId }).count();
//       if (user) {
//         console.log(user);
//         return {
//           statusCode: 200,
//           data: {
//             success: true,
//             message: responseMessages.USER_DETAILS_FOUND,
//             data: {
//               ...user,
//               uplineName: user.uplineId ? user.uplineId.name : '',
//               uplineUserName: user.uplineId ? user.uplineId.username : '',
//               uplineId: user.uplineId ? user.uplineId._id : '',
//               downlineCount: downline,
//               totalEarning: 50,
//               thisMonthEarning: 10,
//             }
//           }
//         };
//       } else {
//         return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
//       }
//     } catch (error) {
//       console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };

//   data = async (userId: string): Promise<ICommonServices> => {
//     try {
//       // let user: any = await Users.findById(userId, { password: 0 }).populate("uplineId").lean();
//       // let downline: any = await Downline.find({ uplineId: userId }).count();
//       // if (user) {
//       //   console.log(user);
//       //   return {
//       //     statusCode: 200,
//       //     data: {
//       //       success: true,
//       //       message: responseMessages.USER_DETAILS_FOUND,
//       //       data: {
//       //         ...user,
//       //         uplineName: user.uplineId ? user.uplineId.name : '',
//       //         uplineId: user.uplineId ? user.uplineId._id : '',
//       //         downlineCount: downline,
//       //         totalEarning: 50,
//       //         thisMonthEarning: 10,
//       //       }
//       //     }
//       //   };
//       // } else {
//       //   return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
//       // }
//       return {
//         statusCode: 200,
//         data: {
//           success: false,
//           data: {
//             thisMonth: 20,
//             total: 100,
//             today: 5,
//             team: 15
//           },
//           message: "Data Found"
//         }
//       };
//     } catch (error) {
//       console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };

//   addPaymentRefNumber = async (req: Request, reqBodyData: PaymentRefViewModel): Promise<ICommonServices> => {
//     try {
//       let payload = req.user as IPayAuth;
//       console.log(payload, "<<<<payload", reqBodyData);
//       let user = await Users.findOne({ paymentRefNumber: reqBodyData.paymentRefNumber }).lean();
//       if (!user) {
//         let result = await Users.findByIdAndUpdate(payload._id,
//           {
//             $set: {
//               paymentRefNumber: reqBodyData.paymentRefNumber,
//               paymentStatus: processing,
//             },
//           }
//         );
//         if (result) {
//           return {
//             statusCode: 200,
//             data: { success: true, message: "payment status updated" }
//           };
//         } else {
//           return {
//             statusCode: 200,
//             data: { success: false, message: "error" }
//           };
//         }

//       } else {
//         return {
//           statusCode: 400,
//           data: { success: false, message: "Please enter valid Ref Number" }
//         };
//       }

//     } catch (err) {
//       console.log(err);
//       return {
//         statusCode: 500,
//         data: { success: false, message: responseMessages.ERROR_ISE }
//       };
//     }
//   };

// }
// export default new UserServicesData();

