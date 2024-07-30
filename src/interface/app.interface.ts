import { Request } from "express";
import { QueryOptions } from "mongoose";


export interface UserPayload {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface UserLoginResponse {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
  token: string;
}

export interface RequestWithUser extends Request {
  user?: {
    _id: string;
    fullName?: string;
    lastName?: string;
    phone?: string;
    role?: string;
    email?: string;
  };
}

export interface PaginationData {
  options: QueryOptions;
}
