import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
import Services from "../services/down.services";
class userControllersData {

  downlineList = async (req: Request, res: Response<ICommonController>) => {
    try {
      let user = await Services.downlineList(req);
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
  countData = async (req: Request, res: Response<ICommonController>) => {
    try {
      let payload = req.user as IPayAuth;
      let user = await Services.countData(req,payload.userId);
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

}
export default new userControllersData();
