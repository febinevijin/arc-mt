import { config } from "dotenv";

config();

export const appConfig = {
  port: process.env.PORT ?? 5000,
  mongoUrl: process.env.MONGO_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  nodeEnv: process.env.NODE_ENV ?? "",
  whiteList: process.env.WHITELIST ?? "",
};
