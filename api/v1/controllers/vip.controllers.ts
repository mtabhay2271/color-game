// import { Request, Response } from "express";
// import responseMessages from "../common/response.messages";
// import { ICommonController, IPayAuth } from "../interfaces/response_interfaces";
// import Services from "../services/vip.services";
// class ControllersData {

//   addVipNumber = async (req: Request, res: Response<ICommonController>) => {
//     try {
//         let user = await Services.addVipNumber(req);
//         return res.status(user.statusCode).send(user.data);
//       }
//    catch (error) {
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };
//   getList = async (req: Request, res: Response<ICommonController>) => {
//     try {
//         let user = await Services.getList(req);
//         return res.status(user.statusCode).send(user.data);
//       }
//    catch (error) {
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };
//   editVipNumber = async (req: Request, res: Response<ICommonController>) => {
//     try {
//         let user = await Services.editVipNumber(req,req.params.vip_id);
//         return res.status(user.statusCode).send(user.data);
//       }
//    catch (error) {
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };
//   deleteVipNumber = async (req: Request, res: Response<ICommonController>) => {
//     try {
//         let user = await Services.deleteVipNumber(req.params.vip_id);
//         return res.status(user.statusCode).send(user.data);
//       }
//    catch (error) {
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };

  

//  }



// export default new ControllersData();
