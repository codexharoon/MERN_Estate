import jwt from "jsonwebtoken";
import { errorHandler } from "./error-handler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return next(errorHandler(401, "Session Expired, Please login again!"));

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return next(errorHandler(403, "Invalid Token!"));

      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
