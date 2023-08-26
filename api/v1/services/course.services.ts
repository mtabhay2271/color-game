// import { Request } from "express";
// import { ICommonServices, IUser } from "../interfaces/response_interfaces";
// import _ from "lodash";
// import responseMessages from "../common/response.messages";
// import { AddCourseViewModel } from "../view_model/course";
// import Courses from "../models/course";

// class dataServicesData {

//   add = async (req: Request, addCourseData: AddCourseViewModel): Promise<ICommonServices> => {
//     try {
//       let data: any = await Courses.create(addCourseData);
//       if (data) {
//         // console.log(data);
//         return {
//           statusCode: 200,
//           data: {
//             success: true,
//             message: "course added",
//             data
//           }
//         };
//       } else {
//         return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
//       }
//     } catch (error) {
//       console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };

//   get = async (): Promise<ICommonServices> => {
//     try {
//       let data: any = await Courses.find({}).sort({ createdAt: 1 }).lean();
//       if (data) {
//         // console.log(data);
//         return {
//           statusCode: 200,
//           data: {
//             success: true,
//             message: "data found",
//             data
//           }
//         };
//       } else {
//         return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
//       }
//     } catch (error) {
//       console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };

//   getById = async (courseId:any): Promise<ICommonServices> => {
//     try {
//       let data: any = await Courses.findById(courseId).lean();
//       if (data) {
//         // console.log(data);
//         return {
//           statusCode: 200,
//           data: {
//             success: true,
//             message: "data found",
//             data
//           }
//         };
//       } else {
//         return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
//       }
//     } catch (error) {
//       console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };

// }
// export default new dataServicesData();

