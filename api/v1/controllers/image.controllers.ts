import { NextFunction, Request, Response } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController } from "../interfaces/response_interfaces";
import Services from "../services/image.services";
import { AddVideoViewModel } from "../view_model/commondata";
class videoControllersData {

  add = async (req: Request, res: Response<ICommonController>) => {
    try {
      // let validatedData: Validation = await utility.validateAndConvert(AddVideoViewModel, req.body);
      // if (validatedData.error) {
      //   return res.status(400).send({
      //     success: false,
      //     message: responseMessages.VALIDATION_ERROR,
      //     data: validatedData.error,
      //   });
      // } else {
      //   let validated_data: AddVideoViewModel = validatedData.data as AddVideoViewModel;
        let image = await Services.add(req, res);
        return res.status(image.statusCode).send(image.data);
      // }
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
      let cat = req?.query?.cat ? req.query.cat : 1;
      let data = await Services.get(+cat);
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
export default new videoControllersData();
