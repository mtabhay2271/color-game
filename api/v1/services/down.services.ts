import { Request } from "express";
import { ICommonServices, IPayAuth, IUser } from "../interfaces/response_interfaces";
import Users, { UserModel } from "../models/users";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { IUserDetails } from "../interfaces/user";

class DownlineServicesData {

  downlineList = async (req: Request): Promise<ICommonServices> => {
    try {
      let payload = req.user as IPayAuth;
      let query = {};
      if (req.query.label == "1") {
        query = { uplineId: payload.userId }
      } else if (req.query.label == "2") {
        query = { uplineId2: payload.userId }
      } else if (req.query.label == "3") {
        query = { uplineId3: payload.userId }
      } else if (req.query.label == "4") {
        query = { uplineId4: payload.userId }
      } else if (req.query.label == "5") {
        query = { uplineId5: payload.userId }
      } else {
        query = { uplineId: payload.userId }
      }
      let user: any = await Users.find(query, { _id: 1, username: 1, name: 1, uplineId: 1, createdAt: 1, contactNumber: 1, plan: 1, status: 1 }).populate('uplineId').sort({ createdAt: -1 }).lean();
      if (user) {
        // console.log(user);
        let data: IUserDetails[]
        data = user.map((e: any) => {
          // console.log({
          //   ...e,
          //   uplineName: e.uplineId.name,
          //   uplineUsername: e.uplineId.username,
          //   uplineId: e.uplineId._id,
          // });

          return {
            ...e,
            uplineName: e.uplineId.name,
            uplineUsername: e.uplineId.username,
            uplineId: e.uplineId._id,
          }
        });
        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.DATA_FOUND,
            data
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.DATA_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

  countData = async (req: Request, uplineId: string): Promise<ICommonServices> => {
    try {
      let arr = []
      arr.push(new Promise(async (reslove, reject) => {
        reslove(await Users.find({ uplineId: uplineId }, { status: 1 }))
      }))
      arr.push(new Promise(async (reslove, reject) => {
        reslove(await Users.find({ uplineId2: uplineId }, { status: 1 }))
      }))
      arr.push(new Promise(async (reslove, reject) => {
        reslove(await Users.find({ uplineId3: uplineId }, { status: 1 }))
      }))
      arr.push(new Promise(async (reslove, reject) => {
        reslove(await Users.find({ uplineId4: uplineId }, { status: 1 }))
      }))
      arr.push(new Promise(async (reslove, reject) => {
        reslove(await Users.find({ uplineId5: uplineId }, { status: 1 }))
      }))

      let data = await Promise.all(arr)
      if (data.length) {
        // console.log(user);

        // console.log(data.length, "total user")
        const result = data.map((group: any, index: number) => {
          const totalElements = group.length;
          const status1Count = group.filter((item: any) => item.status === 1).length;
          return { total: totalElements, active: status1Count };
        });
        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.DATA_FOUND,
            data: result
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.DATA_FOUND_NOT } };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new DownlineServicesData();

