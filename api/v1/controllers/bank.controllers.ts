import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/bank.services";
import { BankDetailsViewModel } from "../view_model/bank";
class ControllersData {

  addBankDetails = async (req: Request, res: Response<ICommonController>) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(BankDetailsViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let reqData: BankDetailsViewModel = validatedData.data as BankDetailsViewModel;
        let user = await Services.addBankDetails(req, reqData);
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

  getBankDetails = async (req: Request, res: Response<ICommonController>) => {
    try {      
      let payload = req.user as IPayAuth;
      let data = await Services.getBankDetails(payload.userId);
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

  getBalance = async (req: Request, res: Response<ICommonController>) => {
    try {      
      let payload = req.user as IPayAuth;
      let data = await Services.getBalance(payload.userId);
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
