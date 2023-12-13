import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/txn.services";
import { TxnViewModel } from "../view_model/txn";
class ControllersData {

  //using
  addTxn = async (req: Request, res: Response<ICommonController>) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(TxnViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let reqData: TxnViewModel = validatedData.data as TxnViewModel;
        let user = await Services.addTxn(req);
        // let user = await Services.addTxn(req, reqData);
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

  //using
  // for admin only
  getTxn = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth;
      // console.log("1111111")
      let data = await Services.getTxn(req);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  getTxnByUser = async (req: Request, res: Response<ICommonController>) => {
    try {
      let payload = req.user as IPayAuth;
      let data = await Services.getTxnByUserId(payload.userId,req.params.status);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  verify = async (req: Request, res: Response<ICommonController>) => {
    try {
      // console.log("req.params.userId",req.params.userId);

      // let payload = req.user as IPayAuth;
      let data = await Services.verify(req);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  //using
  getTxnByUserId = async (req: Request, res: Response<ICommonController>) => {
    try {
      // console.log("req.params.userId",req.params.userId);

      // let payload = req.user as IPayAuth;
      let data = await Services.getTxnByUserId(req.params.userId,req.params.status);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };


  //using
  approveTxn = async (req: Request, res: Response<ICommonController>) => {
    try {
      let payload = req.user as IPayAuth;
      let data = await Services.approveTxn(req, req.params.id);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  //using
  rejectTxn = async (req: Request, res: Response<ICommonController>) => {
    try {
      let payload = req.user as IPayAuth;
      let data = await Services.rejectTxn(req, req.params.id);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };


  //using
  // for admin only
  getTxnByStatus = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let payload = req.user as IPayAuth;
      // console.log("1111111")
      let data = await Services.getTxnByStatus(req?.params?.status);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      // console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

}
export default new ControllersData();
