import { ICommonServices } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import ContactUs from "../models/contactUS";
import SupportModel from "../models/support";

class dataServicesData {

  addContactUs = async (): Promise<ICommonServices> => {
    try {
      let data: any = await ContactUs.create({
        name: "Mr. Raman S/O Mr. Rajbir",
        village: "Rajehri",
        post: "Nachron",
        teh: "Radaur",
        dist: "Yamunanagar",
        pincode: "135001",
        email: "ramankumar407@gmail.com",
        contactNumber: 9466660442
      });
      if (data) {
        console.log(data);
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
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "contact-us data found",
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

  addSupport = async (): Promise<ICommonServices> => {
    try {
      let data: any = await SupportModel.create({
        email: "ramankumar407@gmail.com",
        contactNumber: 9466660442
      });
      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Support data added",
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

  getSupport = async (): Promise<ICommonServices> => {
    try {
      let data: any = await SupportModel.findOne({}).lean();
      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "Support data found",
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

