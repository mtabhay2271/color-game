import { Request } from "express";
import { ICommonServices, IPayAuth, IUser } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { IUserDetails } from "../interfaces/user";
// import Downline from "../models/downlines";
import { PaymentRefViewModel } from "../view_model/users";
// import { processing } from "../common/constants/paymentStatus.constants";
import Users from "../models/users";

class UserServicesData {


  getUserList = async (): Promise<ICommonServices> => {
    try {
      let data: any = await Users.find().lean();
      if (data) {
        console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "User list found",
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
export default new UserServicesData();

