import { Response } from "express";

interface CommonResponseType<T> {
  data: T;
  status: number;
}

export const responseUtils = {
  success: <T>(
    resp: Response,
    { data, status = 200 }: CommonResponseType<T>
  ) => {
    return resp.status(status).send({ data, success: true });
  },
};
