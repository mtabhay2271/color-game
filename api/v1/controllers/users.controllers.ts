// import { Request, Response } from "express";
// import responseMessages from "../common/response.messages";
// import utility, { Validation } from "../common/utility";
// import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
// import Services from "../services/user.services";
// import { PaymentRefViewModel } from "../view_model/users";
// class userControllersData {

//   userDetails = async (req: Request, res: Response<ICommonController>) => {
//     try {      
//       let payload = req.user as IPayAuth;
//       let user = await Services.userDetails(payload._id);
//       // let user = await Services.userDetails("62f7febe4f4e63541f479dcb");
//       return res.status(user.statusCode).send(user.data);
//     } catch (error) {
//       console.log("Error", error);
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };

//   addPaymentRefNumber = async (req: Request, res: Response<ICommonController>) => {
//     try {
//       let validatedData: Validation = await utility.validateAndConvert(PaymentRefViewModel, req.body);
//       if (validatedData.error) {
//         return res.status(400).send({
//           success: false,
//           message: responseMessages.VALIDATION_ERROR,
//           data: validatedData.error,
//         });
//       } else {
//         let validated_user: PaymentRefViewModel = validatedData.data as PaymentRefViewModel;
//         let user = await Services.addPaymentRefNumber(req, validated_user);
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

//   data = async (req: Request, res: Response<ICommonController>) => {
//     try {      
//       let payload = req.user as IPayAuth;
//       let user = await Services.data(payload._id);
//       // let user = await Services.userDetails("62f7febe4f4e63541f479dcb");
//       return res.status(user.statusCode).send(user.data);
//     } catch (error) {
//       console.log("Error", error);
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };

// }
// export default new userControllersData();
