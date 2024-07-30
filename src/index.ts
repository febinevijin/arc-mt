import express from 'express';
import dbConnect from "./config/dbConnection.js"
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { appConfig } from './config/appConfig.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import indexRouter from "./routers/index.js";

const app = express();

await dbConnect();

const whitelist = appConfig.whiteList.split(",");

app.set("trust proxy", 1); // trust first proxy

const corsOptions = {
  
  origin(origin: any, callback: any) {
    if (!origin) {
      // for mobile app and postman client
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(helmet());
app.use(morgan("tiny"));

app.use("/api/v1", indexRouter);
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT ?? 5000;

app.listen(port, () => {
    console.log("--------------------------------" );
    console.log("Server Running on " + `${port}`);
   console.log("--------------------------------");
  return true;
});
