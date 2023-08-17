import { Request, Response } from "express";
import { ICommonServices, IPayAuth } from "../interfaces/response_interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import Users from "../models/users";
// import { DashboardModel } from "../models/dashboard";


class dataServicesData {


  getDashboardContent = async (userId: string): Promise<ICommonServices> => {
    try {
      let data: any = await Users.findById(userId).lean();
      // let data: any = await DashboardDetials.findOne().lean();
      if (data) {
        // console.log(data);
        return {
          statusCode: 200,
          data: {
            success: true,
            message: "dashboard content found",
            data: {
              myNetwork : data?.myNetwork ? data.myNetwork : 0,
              availableAmount : data?.availableAmount ? data.availableAmount : 0,
              todayEarning : data?.todayEarning ? data.todayEarning : 0,
              thisWeekEarning : data?.thisWeekEarning ? data.thisWeekEarning : 0,
              thisMonthEarning : data?.thisMonthEarning ? data.thisMonthEarning : 0,
              totalEarning : data?.thisMonthEarning ? data.thisMonthEarning : 0,
              todayLeads : data?.todayLeads ? data.todayLeads : 0,
              teamEarning : data?.teamEarning ? data.teamEarning : 0,
            }
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

