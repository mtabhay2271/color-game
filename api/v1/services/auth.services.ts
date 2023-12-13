import bcrypt from "bcrypt";
import { Request } from "express";
import _ from "lodash";
var OtpGenerator = require('otp-generator')
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import Users from "../models/users";
import { ResetPasswordViewModel, SignupViewModel } from "../view_model/users";
import utility from "../common/utility";
import responseMessages from "../common/response.messages";
import { OTP_VALID_MINUTES, TOKEN_EXP_TIME } from '../common/constants/time.constants'
// import requestOBJ from 'request'

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
        signupViewModel.username = signupViewModel.username.toLowerCase();
        let verifiedUsername = await Users.findOne({ username: signupViewModel.username });
        if (verifiedUsername) {
          return {
            statusCode: 409,
            data: { success: false, message: responseMessages.USERNAME_EXIST }
          };
        } else {
          if (signupViewModel.referCode) {
            let upline = await Users.findOne({ username: signupViewModel.referCode });
            signupViewModel.uplineId = upline?._id;
            if (upline?.uplineId)
              signupViewModel.uplineId2 = upline.uplineId;
            if (upline?.uplineId2)
              signupViewModel.uplineId3 = upline.uplineId2;
          }

          const salt = await bcrypt.genSalt(10);
          signupViewModel.password = await bcrypt.hash(signupViewModel.password, salt);
          signupViewModel.referCode = signupViewModel.username
          let newUser = await Users.create(signupViewModel);
          if (newUser) {
            newUser.password = '';
            return { statusCode: 200, data: { success: true, data: newUser, message: responseMessages.USER_SIGNUP } };
          } else {
            return { statusCode: 400, data: { success: false, message: responseMessages.USER_SIGNUP_NOT } };
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
      let user = await Users.findOne({ username: req.body.username });
      // console.log(req.body.username,user,"<<<<<<<<<")
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
              name: user.name,
              role: user.role,
              username: user.username,
              myNetwork: user.myNetwork,
              referCode: user.referCode,
              isPaymentDone: user.isPaymentDone,
              paymentStatus: user.paymentStatus,
              availableAmount: user.availableAmount,
              earningAmount: user.earningAmount,
              totalEarning: user.totalEarning,
              _id: user._id,
              token: utility.signJWT(
                {
                  email: user.email,
                  username: user.username,
                  uplineId: user.uplineId,
                  uplineId2: user.uplineId2,
                  uplineId3: user.uplineId3,
                  _id: user._id,
                  role: user.role,
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
      console.log(error, "error<<")
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

  changePassword = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      // console.log(req.body, "req.body")
      // console.log(payload, "<<<<payload");
      if (req.body.oldPassword == req.body.newPassword) {
        return {
          statusCode: 400,
          data: { success: false, message: responseMessages.USER_OLD_NEW_PASSWORD_SAME }
        };
      }
      let user = await Users.findById(payload.userId).lean();
      if (user) {
        if (await bcrypt.compare(req.body.oldPassword, user.password)) {
          const salt = await bcrypt.genSalt(10);
          req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
          let result = await Users.findByIdAndUpdate(payload.userId,
            {
              $set: {
                password: req.body.newPassword
              },
            }
          );
          if (result) {
            return {
              statusCode: 200,
              data: { success: true, message: responseMessages.USER_PASSWORD_CHANGED }
            };
          } else {
            return {
              statusCode: 200,
              data: { success: false, message: responseMessages.USER_PASSWORD_NOT_CHANGED }
            };
          }
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_OLD_PASSWORD_NOT_SAME }
          };
        }
      } else {
        return {
          statusCode: 400,
          data: { success: false, message: "user Not found" }
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

  forgotPassword = async (email: string): Promise<ICommonServices> => {
    try {
      let user = await Users.findOne({ email: email.toLowerCase() }).lean();
      if (!user) {
        return {
          statusCode: 400,
          data: { success: false, message: "User not found" }
        };
      } else {
        let otp = OtpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });
        // let otp = 888888;
        // const timeCount = OTP_VALID_MINUTES * 60 * 1000;
        // const expires = Date.now() + timeCount;
        // const otpWithExpires = `${otp}.${expires}`;
        // let updatedUser = await Users.findByIdAndUpdate(user._id, { $set: { otp: otpWithExpires } });

        // let OTP_API = `http://alots.in/sms-panel/api/http/index.php?username=UNIVERSALOTP&apikey=874D4-FC8F9&apirequest=Template&sender=VIRSOF&mobile=${phoneNumber}&TemplateID=1507163557343366272&Values=${otp}&route=OTP&format=JSON`;
        // await requestOBJ(OTP_API);
        let updatedUser = await Users.findByIdAndUpdate(user._id, { $set: { otp: otp } });
        if (updatedUser) {
          return {
            statusCode: 200,
            data: { success: true, data: { otp, userId: user._id }, message: responseMessages.USER_OTP_SENT }
          };
        } else {
          return {
            statusCode: 200,
            data: { success: false, message: responseMessages.USER_OTP_NOT_SENT, data: otp }
          };
        }
      }
    } catch (err) {
      // console.log(err);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_ISE }
      };
    }
  };

  verifyOtp = async (req: Request): Promise<ICommonServices> => {
    try {
      let user = await Users.findById(req.body.userId);
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
                    uplineId: user.uplineId,
                    uplineId2: user.uplineId2,
                    uplineId3: user.uplineId3,
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
            message: "User not exist",
          }
        };
      }
    } catch (error) {
      console.log(error, "error<<")
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

  resetPassword = async (reqData: ResetPasswordViewModel): Promise<ICommonServices> => {
    try {
      let user = await Users.findById(reqData.userId).lean();
      if (!user) {
        return {
          statusCode: 400,
          data: { success: false, message: "User not found" }
        };
      } else {
        const salt = await bcrypt.genSalt(10);
        reqData.password = await bcrypt.hash(reqData.password, salt);

        let updatedUser = await Users.findByIdAndUpdate(reqData.userId, { $set: { password: reqData.password } });
        if (updatedUser) {
          return {
            statusCode: 200,
            data: { success: true, message: responseMessages.USER_PASSWORD_UPDATED }
          };
        } else {
          return {
            statusCode: 200,
            data: { success: false, message: responseMessages.USER_PASSWORD_NOT_UPDATED }
          };
        }
      }
    } catch (err) {
      // console.log(err);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_ISE }
      };
    }
  };

  acceptUser = async (userId: string) => {
    try {
      let user = await Users.findByIdAndUpdate(userId, { $set: { isAccepted: true } }, { new: true });
      if (user) {
        return {
          statusCode: 200,
          data: { success: true, message: responseMessages.USER_ACCEPTED }
        };
      } else {
        return {
          statusCode: 200,
          data: { success: false, message: responseMessages.USER_PROFILE_UPDATED_NOT }
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_ISE }
      };
    }
  };

  changePasswordByAdmin = async (req: Request): Promise<ICommonServices> => {
    try {
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(req.body.password, salt);
      let updatedUser: any = await Users.findOneAndUpdate({ username: req.body.username }, { $set: { password } }, { new: true })
      return { statusCode: 200, data: { success: true, message: 'Password changed succesfully' } };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };
}
export default new UserServicesData();
