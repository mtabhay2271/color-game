import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/data.services";
class dataControllersData {

  addContactUs = async (req: Request, res: Response<ICommonController>) => {
    try {  
      let data = await Services.addContactUs();
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

  getContactUs = async (req: Request, res: Response<ICommonController>) => {
    try {      
      let payload = req.user as IPayAuth;
      let data = await Services.getContactUs();
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

  addSupport = async (req: Request, res: Response<ICommonController>) => {
    try {  
      let data = await Services.addSupport();
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

  getSupport = async (req: Request, res: Response<ICommonController>) => {
    try {      
      let payload = req.user as IPayAuth;
      let data = await Services.getSupport();
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
export default new dataControllersData();
