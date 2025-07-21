import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";
import { clerkClient, getAuth } from "@clerk/express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.auth) {
    //! req.auth will only be defined if the request sends a valid session token
    throw new UnauthorizedError("Unauthorized");
  }

  // clerkClient.users.updateUser(req.auth.userId, {
  //   publicMetadata: {
  //   },
  // });

  //! By calling req.auth() or passing the request to getAuth() we can get the auth data from the request
  //! userId can be obtained from the auth object
  // console.log(req.auth());
  // console.log(getAuth(req));
  next();
};

export default isAuthenticated;
