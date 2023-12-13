// import bcrypt from "bcrypt";
// import { Request } from "express";
// import _ from "lodash";
// var OtpGenerator = require('otp-generator')
// import { DocumentType } from "@typegoose/typegoose";
// import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
// import FileUsers, { FileUserModel } from "../models/users";
// import {SignupViewModel } from "../view_model/users";
// import utility from "../common/utility";
// import responseMessages from "../common/response.messages";
// import { OTP_VALID_MINUTES, TOKEN_EXP_TIME } from '../common/constants/time.constants'
// import mongoose from 'mongoose';

// class FileUserServicesData {
//   signup = async (req: Request, signupViewModel: SignupViewModel): Promise<ICommonServices> => {
//     try {
//       let verifiedEmail = await FileUsers.findOne({ email: signupViewModel.email });
//       if (verifiedEmail) {
//         return {
//           statusCode: 409,
//           data: { success: false, message: responseMessages.EMAIL_EXIST }
//         };
//       } else {
//         signupViewModel.username = signupViewModel.username.toLowerCase();
//         let verifiedFileUsername = await FileUsers.findOne({ username: signupViewModel.username });
//         if (verifiedFileUsername) {
//           return {
//             statusCode: 409,
//             data: { success: false, message: responseMessages.USERNAME_EXIST }
//           };
//         } else {
         
//           const salt = await bcrypt.genSalt(10);
//           signupViewModel.password = await bcrypt.hash(signupViewModel.password, salt);
//           let newFileUser = await FileUsers.create(signupViewModel);
//           if (newFileUser) {
            
//             newFileUser.password = '';
//             return { statusCode: 200, data: { success: true, data: newFileUser, message: responseMessages.USER_SIGNUP } };
//           } else {
//             return { statusCode: 400, data: { success: false, message: responseMessages.USER_SIGNUP_NOT } };
//           }
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };

//   login = async (req: Request): Promise<ICommonServices> => {
//     try {
//       let user = await FileUsers.findOne({ username: req.body.username.toLowerCase() });
//       if (!user) {
//         return {
//           statusCode: 200,
//           data: {
//             success: false,
//             message: responseMessages.USER_FOUND_NOT
//           }
//         }
//       } else if (await bcrypt.compare(req.body.password, user.password)) {
//         return {
//           statusCode: 200,
//           data: {
//             success: true,
//             message: responseMessages.USER_LOGIN,
//             data: {
//               email: user.email,
//               name: user.name,
//               username: user.username,
//               _id: user._id,
//               token: utility.signJWT(
//                 {
//                   email: user.email,
//                   username: user.username,
//                   _id: user._id,
//                 },
//                 TOKEN_EXP_TIME
//               ),
//             }
//           }
//         };
//       } else {
//         return {
//           statusCode: 200,
//           data: {
//             success: false,
//             message: "Wronge Password"
//           }
//         }
//       }
//     } catch (error) {
//       return {
//         statusCode: 500,
//         data: {
//           success: false,
//           message: responseMessages.ERROR_OCCURRE,
//           error
//         }
//       };
//     }
//   };

// }
// export default new FileUserServicesData();
