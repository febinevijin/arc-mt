import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { userRole } from "../../utils/enum.js";
import { CommonLoginData } from "../../interface/admin.interface.js";
import { generateAPIError } from "../../errors/apiError.js";
import { generateToken } from "../../utils/authUtils.js";
import { UserLoginResponse } from "../../interface/app.interface.js";
import { UserData, UserDocument } from "../../interface/user.interface.js";

const adminSignUp = async (adminData: CommonLoginData): Promise<any> => {
  const { email, password } = adminData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await User.create({
    email: email,
    password: hashedPassword,
    role: userRole.ADMIN,
  });
  return admin;
};

const commonLogin = async (
  data: CommonLoginData,
  role: string
): Promise<UserLoginResponse> => {
  const { email, password } = data;
  // Find the user by email and role
  const user = await User.findOne({ email, role }).select(
    "_id email role password isActive"
  );
  // if (user && !user.isActive)
  //   return generateAPIError("user account has been de-activated", 400);
  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    // check user and user password are correct or not , then create token with user _id
    const token = await generateToken({ id: user?._id });
    return {
      _id: user._id.toString(), // Convert ObjectId to string
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      token,
    };
  } else {
    return await generateAPIError("Invalid email or password", 400);
  }
};

const userSignUp = async (userData: UserData): Promise<UserDocument> => {
  const { email, phone, password } = userData;
  // Check if user with same email or phone already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
    role: userRole.USER,
  });
  if (existingUser) {
    return generateAPIError(
      "User with this email or phone number already exists",
      400
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    ...userData,
    password: hashedPassword,
    role: userRole.USER,
  });
  return user;
};

export const authService = {
  adminSignUp,
  commonLogin,
  userSignUp,
};
