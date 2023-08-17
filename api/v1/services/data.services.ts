import { Request } from "express";
import { ICommonServices, IUser } from "../interfaces/response_interfaces";
import Users, { UserModel } from "../models/users";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { IUserDetails } from "../interfaces/user";
import ContactUs from "../models/contactUS";

class dataServicesData {

  addContactUs = async (): Promise<ICommonServices> => {
    try {
      let data: any = await ContactUs.create({
        name: "Lead Genrator",
        address: "VPO Kanech, pin-code 141120",
        email: "abhay@gmail.com",
        contactNumber: 9653309234
      });
      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "data added",
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

  getContactUs = async (): Promise<ICommonServices> => {
    try {
      let data: any = await ContactUs.findOne({}).lean();
      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "data found",
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
  getUpi = async (): Promise<ICommonServices> => {
    try {
      // let data: any = await ContactUs.findOne({}).lean();
      // if (data) {
      //   // console.log(data);
      //   return {
      //     statusCode: 200,
      //     data: {
      //       success: true,
      //       message: "data found",
      //       data
      //     }
      //   };
      // } else {
      //   return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      // }
      return {
        statusCode: 200,
        data: {
          success: true,
          message: "found",
          data: {
            upi:"Ridhu201@upi",
            qrcode:"public/data/qr.jpg"
          }
        }
      };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new dataServicesData();

