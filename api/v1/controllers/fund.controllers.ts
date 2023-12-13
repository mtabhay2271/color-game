import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/fund.services";
class ControllersData {

  addFund = async (req: any, res: Response<ICommonController>) => {
    try {
        let user = await Services.addFund(req);
        return res.status(user.statusCode).send(user.data);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };
  getFunds = async (req: any, res: Response<ICommonController>) => {
    try {
        let user = await Services.getFunds();
        return res.status(user.statusCode).send(user.data);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };
  getFundsById = async (req: any, res: Response<ICommonController>) => {
    try {
        let user = await Services.getFundsById(req);
        return res.status(user.statusCode).send(user.data);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  approveFunds = async (req: any, res: Response<ICommonController>) => {
    try {
        let user = await Services.approveFunds(req);
        return res.status(user.statusCode).send(user.data);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };
  rejectFunds = async (req: any, res: Response<ICommonController>) => {
    try {
        let user = await Services.rejectFunds(req);
        return res.status(user.statusCode).send(user.data);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

 }



export default new ControllersData();
