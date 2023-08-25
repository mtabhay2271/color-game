// import { NextFunction, Request, Response } from "express";
// import responseMessages from "../common/response.messages";
// import utility, { Validation } from "../common/utility";
// import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
// import Services from "../services/course.services";
// import { AddCourseViewModel } from "../view_model/course";
// class courseControllersData {

//   add = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
//     try {
//       let validatedData: Validation = await utility.validateAndConvert(AddCourseViewModel, req.body);
//       if (validatedData.error) {
//         return res.status(400).send({
//           success: false,
//           message: responseMessages.VALIDATION_ERROR,
//           data: validatedData.error,
//         });
//       } else {
//         let validated_data: AddCourseViewModel = validatedData.data as AddCourseViewModel;
//         let user = await Services.add(req, validated_data);
//         return res.status(user.statusCode).send(user.data);
//       }
//     } catch (error) {
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };

//   get = async (req: Request, res: Response<ICommonController>) => {
//     try {
//       let payload = req.user as IPayAuth;
//       let data = await Services.get();
//       return res.status(data.statusCode).send(data.data);
//     } catch (error) {
//       // console.log("Error", error);
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };
  
//   getById = async (req: Request, res: Response<ICommonController>) => {
//     try {
//       let payload = req.user as IPayAuth;
//       let data = await Services.getById(req.params.courseId);
//       return res.status(data.statusCode).send(data.data);
//     } catch (error) {
//       // console.log("Error", error);
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };
// }
// export default new courseControllersData();
