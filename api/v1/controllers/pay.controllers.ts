import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/pay.services";
class ControllersData {

  getUpi = async (req: any, res: Response<ICommonController>) => {
    try {
        let user = await Services.getUpi(req);
        return res.status(user.statusCode).send(user.data);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error
      });
    }
  };
  createUpi = async (req: any, res: Response<ICommonController>) => {
    try {
        let user = await Services.createUpi(req);
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
