import UnauthorizedError from "../../domain/errors/unauthorized-error";
import { Request, Response, NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const isUserLoggedIn = false;
  if (!isUserLoggedIn) {
    throw new UnauthorizedError("Unauthorized");
  } else {
    next();
  }
};

export default isAuthenticated;
