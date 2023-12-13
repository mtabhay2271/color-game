// import { Request, Response, NextFunction } from "express";
// import responseMessages from "../common/response.messages";
// import utility, { Validation } from "../common/utility";
// import { ICommonController } from "../interfaces/response_interfaces";
// import Services from "../services/auth.services";
// import { LoginViewModel, SignupViewModel, ChangePasswordViewModel, ForgetPasswordViewModel, ResetPasswordViewModel } from "../view_model/users";
// class authControllersData {
//   signup = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
//     try {
//       let validatedData: Validation = await utility.validateAndConvert(SignupViewModel, req.body);
//       if (validatedData.error) {
//         return res.status(400).send({
//           success: false,
//           message: responseMessages.VALIDATION_ERROR,
//           data: validatedData.error,
//         });
//       } else {
//         let validated_user: SignupViewModel = validatedData.data as SignupViewModel;
//         let user = await Services.signup(req, validated_user);
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

//   login = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
//     try {
//       let validatedData: Validation = await utility.validateAndConvert(LoginViewModel, req.body);
//       if (validatedData.error) {
//         return res.status(400).send({
//           success: false,
//           message: responseMessages.VALIDATION_ERROR,
//           data: validatedData.error,
//         });
//       } else {
//         let user = await Services.login(req);
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

// }
// export default new authControllersData();
