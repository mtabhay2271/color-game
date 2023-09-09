import { Request, Response, NextFunction } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController } from "../interfaces/response_interfaces";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/auth.services";
import Users from "../models/users";
import { OTP_VALID_MINUTES, TOKEN_EXP_TIME } from '../common/constants/time.constants';

import { LoginViewModel, SignupViewModel, verifyOtpViewModel, ChangePasswordViewModel, ForgetPasswordViewModel, ResetPasswordViewModel } from "../view_model/users";
class authControllersData {
  signup = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(SignupViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let validated_user: SignupViewModel = validatedData.data as SignupViewModel;
        let user = await Services.signup(req, validated_user);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  login = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(LoginViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let user = await Services.login(req);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };


  changePasswordByAdmin = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth
      let data = await Services.changePasswordByAdmin(req)
      return res.status(data.statusCode).send(data.data)
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  }
  changePassword = async (req: Request, res: Response) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(ChangePasswordViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error
        });
      } else {
        let response = await Services.changePassword(req);
        return res.status(response.statusCode).send(response.data);
      }

    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(ForgetPasswordViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error
        });
      } else {
        let reqBodyData: ForgetPasswordViewModel = validatedData.data as ForgetPasswordViewModel;
        let response = await Services.forgotPassword(reqBodyData.email);
        return res.status(response.statusCode).send(response.data);
      }

    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(ResetPasswordViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error
        });
      } else {
        let reqBodyData: ResetPasswordViewModel = validatedData.data as ResetPasswordViewModel;
        let response = await Services.resetPassword(reqBodyData);
        return res.status(response.statusCode).send(response.data);
      }

    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  acceptUser = async (req: Request, res: Response) => {
    try {
      let response = await Services.acceptUser(req.params.userId);
      return res.status(response.statusCode).send(response.data);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  verifyOtp = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(verifyOtpViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let user = await Services.verifyOtp(req);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      console.log("error>>", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };


};
export default new authControllersData();
