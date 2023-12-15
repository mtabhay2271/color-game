import { NextFunction, Request, Response } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController } from "../interfaces/response_interfaces";
import Services from "../services/lottery.services";
import { AddColor, JoinLotteryGame } from "../view_model/commondata";
class ControllersData {

  add = async (req: Request, res: Response<ICommonController>) => {
    try {
      let data = await Services.add();
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  get = async (req: Request, res: Response<ICommonController>) => {
    try {
      let data = await Services.get();
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };

  join = async (req: Request, res: Response<ICommonController>) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(JoinLotteryGame, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let data = await Services.join(req);
        return res.status(data.statusCode).send(data.data);
      }
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };
  getJoinList = async (req: Request, res: Response<ICommonController>) => {
    try {

      let data = await Services.getJoinList(req);
      return res.status(data.statusCode).send(data.data);
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };
}
export default new ControllersData();
