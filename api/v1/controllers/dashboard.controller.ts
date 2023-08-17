import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/dashboard.services";
class ControllersData {


  getDashboardContent = async (req: Request, res: Response<ICommonController>) => {
    try {      
      let payload = req.user as IPayAuth;
      let data = await Services.getDashboardContent(payload.userId );
      // let data = await Services.getDashboardContent(payload.userId);
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
