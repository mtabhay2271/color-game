import { Request } from "express";
import { ICommonServices, IPayAuth, IUser } from "../interfaces/response_interfaces";
import responseMessages from "../common/response.messages";
import ImageKit from "imagekit";

class ImageServicesData {

  upload = async (req: Request,): Promise<ICommonServices> => {
    try {
      // SDK initialization


      var imagekit = new ImageKit({
        publicKey: "public_v92Fa9du1JzySUcIrTsgpyMMswY=",
        privateKey: "private_12DolIolyrUlWHnH+DGQfP0r9mE=",
        urlEndpoint: "https://ik.imagekit.io/skt"
      });

      // imagekit.upload({
      //   file: req.files.image, //required
      //   fileName: "my_file_name.jpg",   //required
      //   extensions: [
      //     {
      //       name: "google-auto-tagging",
      //       maxTags: 5,
      //       minConfidence: 95
      //     }
      //   ]
      // }, function (error, result) {
      //   if (error) // console.log(error);
      //   else // console.log(result);
      // });
      let user = ''
      if (user) {
        // console.log(user);
        return {
          statusCode: 200,
          data: {
            success: false, message: ""
          }
        };
      } else {
        return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
      }
    } catch (error) {
      // console.log(error);
      return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
    }
  };

}
export default new ImageServicesData();

