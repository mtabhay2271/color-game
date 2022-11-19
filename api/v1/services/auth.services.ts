import bcrypt from "bcrypt";
import { Request } from "express";
import _ from "lodash";
var OtpGenerator = require('otp-generator')
import { DocumentType } from "@typegoose/typegoose";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import Users, { UserModel } from "../models/users";
import { ChangePasswordViewModel, ResetPasswordViewModel, SignupViewModel } from "../view_model/users";
import utility from "../common/utility";
import responseMessages from "../common/response.messages";
import { OTP_VALID_MINUTES, TOKEN_EXP_TIME } from '../common/constants/time.constants';

class UserServicesData {
  signup = async (req: Request, signupViewModel: SignupViewModel): Promise<ICommonServices> => {
    try {
      let verifiedEmail = await Users.findOne({ email: signupViewModel.email });
      if (verifiedEmail) {
        return {
          statusCode: 409,
          data: { success: false, message: responseMessages.EMAIL_EXIST }
        };
      } else {
        let verifiedPhone = await Users.findOne({ phoneNumber: signupViewModel.phoneNumber });
        if (verifiedPhone) {
          return {
            statusCode: 409,
            data: { success: false, message: responseMessages.PHONE_EXIST }
          };
        } else {
          signupViewModel.username = signupViewModel.username.toLowerCase();
          let verifiedUsername = await Users.findOne({ username: signupViewModel.username });
          if (verifiedUsername) {
            return {
              statusCode: 409,
              data: { success: false, message: responseMessages.USERNAME_EXIST }
            };
          } else {
            const salt = await bcrypt.genSalt(10);
            signupViewModel.password = await bcrypt.hash(signupViewModel.password, salt);
            let newUser = await Users.create(signupViewModel);
            if (newUser) {
              newUser.password = '';
              return { statusCode: 200, data: { success: true, data: newUser, message: responseMessages.USER_SIGNUP } };
            } else {
              return { statusCode: 400, data: { success: false, message: responseMessages.USER_SIGNUP_NOT } };
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  login = async (req: Request): Promise<ICommonServices> => {
    try {
      let user = await Users.findOne({ username: req.body.username.toLowerCase() });
      if (!user) {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.USER_FOUND_NOT
          }
        }
      } else if (await bcrypt.compare(req.body.password, user.password)) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.USER_LOGIN,
            data: {
              email: user.email,
              // name: user.name,
              // role: user.role,
              username: user.username,
              // isPaymentDone: user.isPaymentDone,
              // paymentStatus: user.paymentStatus,
              _id: user._id,
              token: utility.signJWT(
                {
                  email: user.email,
                  username: user.username,
                  _id: user._id,
                  // role: user.role,
                },
                TOKEN_EXP_TIME
              ),
            }
          }
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: "Wronge Password"
          }
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          success: false,
          message: responseMessages.ERROR_OCCURRE,
          error
        }
      };
    }
  };

  loginWithPhone = async (req: Request): Promise<ICommonServices> => {
    try {
      let otp = 88888;
      let user = await Users.updateOne({ phoneNumber: req.body.phoneNumber }, { $set: { otp } }, { upsert: true });
      return {
        statusCode: 200,
        data: {
          success: true,
          data: {
            phoneNumber: req.body.phoneNumber,
            otp: otp
          },
          message: responseMessages.USER_OTP_SENT
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          success: false,
          message: responseMessages.ERROR_OCCURRE,
          error
        }
      };
    }
  };

  verifyPhone = async (req: Request): Promise<ICommonServices> => {
    try {
      let user = await Users.findOne({ phoneNumber: req.body.phoneNumber });
      if (user) {
        if (user.otp == req.body.otp) {
          return {
            statusCode: 200,
            data: {
              success: true,
              message: responseMessages.USER_LOGIN,
              data: {
                email: user.email,
                username: user.username,
                _id: user._id,
                token: utility.signJWT(
                  {
                    email: user.email,
                    username: user.username,
                    _id: user._id,
                  },
                  TOKEN_EXP_TIME
                ),
              }
            }
          };
        } else {
          return {
            statusCode: 400,
            data: {
              success: false,
              message: "Wrong otp",
            }
          };
        }
      } else {
        return {
          statusCode: 400,
          data: {
            success: false,
            message: "User not exist with this phone number",
          }
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          success: false,
          message: responseMessages.ERROR_OCCURRE,
          error
        }
      };
    }
  };


  forgotPassword = async (email: string): Promise<ICommonServices> => {
    try {
      let user = await Users.findOne({ email: email.toLowerCase() }).lean();
      if (!user) {
        return {
          statusCode: 400,
          data: { success: false, message: "User not found" }
        };
      } else {
        // let otp = OtpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });
        let otp = 888888;
        // const timeCount = OTP_VALID_MINUTES * 60 * 1000;
        // const expires = Date.now() + timeCount;
        // const otpWithExpires = `${otp}.${expires}`;
        // let updatedUser = await Users.findByIdAndUpdate(user._id, { $set: { otp: otpWithExpires } });
        let updatedUser = await Users.findByIdAndUpdate(user._id, { $set: { otp: otp } });
        if (updatedUser) {
          return {
            statusCode: 200,
            data: { success: true, data: { otp, phoneNumber: user.phoneNumber }, message: responseMessages.USER_OTP_SENT }
          };
        } else {
          return {
            statusCode: 200,
            data: { success: false, message: responseMessages.USER_OTP_NOT_SENT, data: otp }
          };
        }

      }

    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_ISE }
      };
    }
  };

  // changePassword = async (req: Request, reqBodyData: ChangePasswordViewModel): Promise<ICommonServices> => {
  //   try {
  //     let payload = req.user as IPayAuth;
  //     console.log(payload, "<<<<payload", reqBodyData);
  //     if (reqBodyData.oldPassword == reqBodyData.newPassword) {
  //       return {
  //         statusCode: 400,
  //         data: { success: false, message: responseMessages.USER_OLD_NEW_PASSWORD_SAME }
  //       };
  //     }
  //     let user = await Users.findById(payload._id).lean();
  //     if (user) {
  //       if (await bcrypt.compare(reqBodyData.oldPassword, user.password)) {
  //         const salt = await bcrypt.genSalt(10);
  //         reqBodyData.newPassword = await bcrypt.hash(reqBodyData.newPassword, salt);
  //         let result = await Users.findByIdAndUpdate(payload._id,
  //           {
  //             $set: {
  //               password: reqBodyData.newPassword
  //             },
  //           }
  //         );
  //         if (result) {
  //           return {
  //             statusCode: 200,
  //             data: { success: true, message: responseMessages.USER_PASSWORD_CHANGED }
  //           };
  //         } else {
  //           return {
  //             statusCode: 200,
  //             data: { success: false, message: responseMessages.USER_PASSWORD_NOT_CHANGED }
  //           };
  //         }
  //       } else {
  //         return {
  //           statusCode: 400,
  //           data: { success: false, message: responseMessages.USER_OLD_PASSWORD_NOT_SAME }
  //         };
  //       }
  //     } else {
  //       return {
  //         statusCode: 400,
  //         data: { success: false, message: "user Not found" }
  //       };
  //     }

  //   } catch (err) {
  //     console.log(err);
  //     return {
  //       statusCode: 500,
  //       data: { success: false, message: responseMessages.ERROR_ISE }
  //     };
  //   }
  // };


  // resetPassword = async (reqBodyData: ResetPasswordViewModel) => {
  //   try {
  //     let user = await Users.findOne({ username: reqBodyData.username.toLowerCase() });
  //     if (!user) {
  //       return {
  //         statusCode: 400,
  //         data: { success: false, message: "user not exist" }
  //       };
  //     } else {
  //       let now = Date.now();
  //       let expireArray = user.forgetPassOtp.split(".");
  //       if (now > parseInt(expireArray[1]) || !user.forgetPassOtp.length) {
  //         return {
  //           statusCode: 400,
  //           data: { success: false, message: "Otp Expired" }
  //         };
  //       }
  //       const salt = await bcrypt.genSalt(10);
  //       reqBodyData.password = await bcrypt.hash(reqBodyData.password, salt);
  //       let result = await Users.findByIdAndUpdate(user._id,
  //         {
  //           $set: {
  //             password: reqBodyData.password,
  //             forgetPassOtp: ''
  //           },
  //         }
  //       );
  //       if (result) {
  //         return {
  //           statusCode: 200,
  //           data: { success: true, message: responseMessages.USER_PASSWORD_UPDATED }
  //         };
  //       } else {
  //         return {
  //           statusCode: 200,
  //           data: { success: false, message: responseMessages.USER_PASSWORD_NOT_UPDATED }
  //         };
  //       }

  //     }

  //   } catch (err) {
  //     // console.log(err);
  //     return {
  //       statusCode: 500,
  //       data: { success: false, message: responseMessages.ERROR_ISE }
  //     };
  //   }
  // };

  // acceptUser = async (userId: string) => {
  //   try {
  //     let user = await Users.findByIdAndUpdate(userId, { $set: { isAccepted: true } }, { new: true });
  //     if (user) {
  //       return {
  //         statusCode: 200,
  //         data: { success: true, message: responseMessages.USER_ACCEPTED }
  //       };
  //     } else {
  //       return {
  //         statusCode: 200,
  //         data: { success: false, message: responseMessages.USER_PROFILE_UPDATED_NOT }
  //       };
  //     }
  //   } catch (err) {
  //     return {
  //       statusCode: 500,
  //       data: { success: false, message: responseMessages.ERROR_ISE }
  //     };
  //   }
  // };

}
export default new UserServicesData();
