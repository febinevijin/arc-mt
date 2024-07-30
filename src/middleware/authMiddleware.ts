import { Response, NextFunction } from "express";
import { RequestWithUser, UserPayload } from "../interface/app.interface.js";
import { appConfig } from "../config/appConfig.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { userRole } from "../utils/enum.js";

export const protect = (allowedRoles: string[]) => {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
        let token: any;
        if (req.headers.authorization?.startsWith("Bearer") === true) { 
            try {
                 token = req.headers.authorization.split(" ")[1];
                let decoded: any = {};
                decoded = jwt.verify(token, appConfig.jwtSecret);
                if (decoded) {
                     const user = await User.findOne({
                       _id: decoded.id,
                     }).select("_id email role isActive");
                    if (user && allowedRoles.includes(user.role)) {
                      if (user.role !== userRole.ADMIN && !user.isActive)
                        res.status(403).send({ message: "Forbidden" });

                      // Convert ObjectId to string
                      const userPayload: UserPayload = {
                        _id: user._id.toString(),
                        email: user.email,
                        role: user.role,
                        isActive: user.isActive,
                      };

                      req.user = userPayload;
                      next();
                    } else {
                        res.status(403).send({ message: "Forbidden" });
                    }
                } else {
                    res.status(401).send({ message: "Unauthorized" });
                }
            } catch (error) {
                 console.error(error);
                 res.status(401).send({ message: "Unauthorized" });
            }
        }
         if (!token) {
           res.status(401).send({ message: "Unauthorized, No token" });
         }

  };
};
