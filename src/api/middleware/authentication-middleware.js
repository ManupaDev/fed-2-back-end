import UnauthorizedError from "../../domain/errors/unauthorized-error.js";

const isAuthenticated = (req, res, next) => {
  const isUserLoggedIn = false;
  if (!isUserLoggedIn) {
    throw new UnauthorizedError("Unauthorized");
  } else {
    next();
  }
};

export default isAuthenticated;
