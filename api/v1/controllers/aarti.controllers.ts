import { Request, Response } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController } from "../interfaces/response_interfaces";
import Services from "../services/aarti.services";
import { AddAartiViewModel } from "../view_model/commondata";
class ControllersData {

  add = async (req: Request, res: Response<ICommonController>) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(AddAartiViewModel, req.body);
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          data: validatedData.error,
        });
      } else {
        let validated_data: AddAartiViewModel = validatedData.data as AddAartiViewModel;
        let user = await Services.add(req, validated_data);
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

  getById = async (req: Request, res: Response<ICommonController>) => {
    try {
      let data = await Services.getById(req.params.id);
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
