import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import VipNumber from "../models/vip";
import requestOBJ from 'request'

class dataServicesData {

  addVipNumber = async (req: Request): Promise<ICommonServices> => {
    try {
      // let payload = req.user as IPayAuth;
      let data:any =await VipNumber.insertMany([
        {phoneNumber:"98989898"},
        {phoneNumber:"97979797"},
        {phoneNumber:"96969696"},
        {phoneNumber:"95959595"},
        {phoneNumber:"94949494"},
        {phoneNumber:"93939393"},
        {phoneNumber:"92929292"},
        {phoneNumber:"91919191"},
        {phoneNumber:"90909090"},
      ])
      
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Vip Number Added",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };
  getList = async (req: Request): Promise<ICommonServices> => {
    try {
      // let payload = req.user as IPayAuth;
      let data: any = await VipNumber.find();
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Vip Number Added",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };
  editVipNumber = async (req: Request,id:string): Promise<ICommonServices> => {
    try {
      let data: any = await VipNumber.findByIdAndUpdate(id,req.body,{new:true});
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Vip Number Updated",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };
  deleteVipNumber = async (id:string): Promise<ICommonServices> => {
    try {
      let data: any = await VipNumber.findByIdAndDelete(id,{new:true});
      if (data) {
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Vip Number Deleted",
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new dataServicesData();

