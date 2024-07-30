
import UserModel from "../models/User.js"

export type UserDocument = InstanceType<typeof UserModel>;


export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  isActive?: boolean;
}