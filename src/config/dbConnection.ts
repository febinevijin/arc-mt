import mongoose from "mongoose";

import { appConfig } from "../config/appConfig.js";

const connect = async (): Promise<any> => {
  await mongoose
    .connect(appConfig.mongoUrl)
    .then(() => {
      console.log("--------------------------------");
      console.log("Connected to db");
      console.log("--------------------------------");
    })
    .catch((err) => {
      console.log("--------------------------------");
      console.log(err);
      console.log("--------------------------------");
    });
};

export default connect;
