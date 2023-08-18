import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import { ICommonController } from "../interfaces/response_interfaces";
import Services from "../services/reword.services";
class ControllersData {

  getReword = async (req: Request, res: Response<ICommonController>) => {
    try {
      let data = await Services.getReword(req);
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
