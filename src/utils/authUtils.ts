import { NextFunction, Response } from "express";
import { appConfig } from "../config/appConfig.js";
import jwt from "jsonwebtoken";

export const generateToken = async (data: any): Promise<string> => {
  const options = {
    expiresIn: "10d",
  };
  return jwt.sign({ ...data }, appConfig.jwtSecret, options);
};

export const decodeToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token: any;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).send({ message: "Not Authorized,No token" });
      }

      const decoded: any = jwt.verify(token, appConfig.jwtSecret);

      if (decoded) {
        return decoded;
      }

      next();
    } catch (error) {
      res.status(401).send({ message: "Not Authroized" });
    }
  }
  if (!token) {
    res.status(401).send({ message: "Not Authorized,No token" });
  }
};
