import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction } from "express";
import jwt from 'jsonwebtoken';
import _ from "lodash";
import Users from "../models/users";
import { DEFAULT_EXP_TIME } from "./constants/time.constants";

const secret_key = "shsjfhsdu6fejfbd7f";

export class Validation {
  data: any;
  error: any;
}

class Utility {
  validateAndConvert = async (validateData: any, body: any) => {
    const result = new Validation();
    result.data = plainToClass(validateData, body);
    await validate(result.data, { skipMissingProperties: true }).then(
      (errors) => {
        if (errors.length > 0) {
          result.error = errors.map((err) => err.constraints);
          return result;
        }
      }
    );
    return result;
  };
  authenticateUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const auth_header: string = req.headers.authorization;
      if (auth_header) {
        jwt.verify(auth_header, secret_key, async (err: any, user: any) => {
          try {
            // console.log(user);

            if (user.exp > Date.now()) {
              // console.log(user.exp - Date.now());
              if (req.baseUrl == '/api/v1/auth/logOut') {
                return res.status(200).json({ status: true, msg: 'logout successfully' });
              } else {
                return res.status(401).json({ status: false, msg: "Token expired" });
              }
            } else if (user && user._id) {
              let result: any;
              result = await Users.findById(user._id);
              if (result && result.username && result.username === user.username) {
                req.user = {
                  userId: user._id,
                  email: user.email,
                  username: user.username,
                  // exp: number,
                  // iat: number,
                  role: user.role,
                  uplineId: user.uplineId,
                  uplineId2: user.uplineId2,
                  uplineId3: user.uplineId3,
                };
                result.password = '';
                req.userDetail = result;
                next();
              } else {
                return res.status(401).json({ status: false, error: "User not exist.", });
              }
            } else {
              return res.status(401).json({ status: false, error: "Unauthorized access.", });
            }
          } catch (error) {
            return res.status(401).json({ status: false, msg: "Token expired" });
          }
        });
      } else {
        return res.status(401).json({ status: false, error: "Authentication header required", });
      }
    } catch (error) {
      return res.status(500).json({ status: false, error: "Internal Server Error", });
    }
  }

  authenticateAdmin = async (req: any, res: any, next: NextFunction) => {
    try {
      const auth_header: string = req.headers.authorization;
      if (auth_header) {
        jwt.verify(auth_header, secret_key, async (err: any, user: any) => {
          try {
            // console.log(user);

            if (user.exp > Date.now()) {
              // console.log(user.exp - Date.now());
              if (req.baseUrl == '/api/v1/auth/logOut') {
                return res.status(200).json({ status: true, msg: 'logout successfully' });
              } else {
                return res.status(401).json({ status: false, msg: "Token expired" });
              }
            } else if (user && user._id) {
              let result: any;
              result = await Users.findById(user._id);
              if (result && result.username && result.username === user.username) {
                // console.log(result.role);

                if (result.role == 1) {
                  req.user = {
                    userId: user._id,
                    email: user.email,
                    username: user.username,
                    // exp: number,
                    // iat: number,
                    role: user.role,
                    uplineId: user.uplineId,
                    uplineId2: user.uplineId2,
                    uplineId3: user.uplineId3,
                  };
                  result.password = '';
                  req.userDetail = result;
                  next();
                } else {
                  return res.status(401).json({ status: false, error: "You are not Admin", });
                }
              } else {
                return res.status(401).json({ status: false, error: "User not exist.", });
              }
            } else {
              return res.status(401).json({ status: false, error: "Unauthorized access.", });
            }
          } catch (error) {
            return res.status(401).json({ status: false, msg: "Token expired" });
          }
        });
      } else {
        return res.status(401).json({ status: false, error: "Authentication header required", });
      }
    } catch (error) {
      return res.status(500).json({ status: false, error: "Internal Server Error", });
    }
  }
  signJWT = (payload: any, expires_in?: string): string => {
    let jwtToken = jwt.sign(payload, secret_key, {
      expiresIn: expires_in ?? DEFAULT_EXP_TIME,
    });
    return jwtToken;
  };

  SaveUploadedFileToLocal = (imageFile: any, path: any) => {
    imageFile.mv(path, function (error: any) {
      if (error) {
        return error
      }
    })
    return path
  }
};


export default new Utility();