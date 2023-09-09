import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/user.services";
import { PaymentRefViewModel } from "../view_model/users";
class userControllersData {

  userDetails = async (req: Request, res: Response<ICommonController>) => {
    try {
      let payload = req.user as IPayAuth;
      let user = await Services.userDetails(payload.userId);
      // let user = await Services.userDetails("62f7febe4f4e63541f479dcb");
      return res.status(user.statusCode).send(user.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  addPaymentRefNumber = async (req: Request, res: Response<ICommonController>) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(PaymentRefViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let validated_user: PaymentRefViewModel = validatedData.data as PaymentRefViewModel;
        let user = await Services.addPaymentRefNumber(req, validated_user);
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

  getUserList = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth
      let data = await Services.getUserList()
      return res.status(data.statusCode).send(data.data)
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  }

  userByUsername = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth;
      let data = await Services.userByUsername(req.params.username);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  }
  userById = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth;
      let data = await Services.userById(req.params.userId);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  }

  getUserMaxEarning = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth
      let data = await Services.getUserMaxEarning()
      return res.status(data.statusCode).send(data.data)
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  }

  transferBalance = async (req: Request, res: Response<ICommonController>) => {
    try {
      let data = await Services.transferBalance(req)
      return res.status(data.statusCode).send(data.data)
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  }

  filter = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth
      let data = await Services.filter(req)
      return res.status(data.statusCode).send(data.data)
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  }

  // data = async (req: Request, res: Response<ICommonController>) => {
  //   try {
  //     let payload = req.user as IPayAuth;
  //     // console.log(payload, "payload<<<<<<<<<<<<<<<<")
  //     let user = await Services.data();
  //     // let user = await Services.downlineList("62f7f79db1d7b2a7449b2921");
  //     return res.status(user.statusCode).send(user.data);
  //   } catch (error) {
  //     // console.log("Error", error);
  //     return res.status(500).send({
  //       success: false,
  //       message: responseMessages.ERROR_ISE,
  //       error
  //     });
  //   }
  // };


}
export default new userControllersData();
