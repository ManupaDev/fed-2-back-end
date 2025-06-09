import ValidationError from "../../domain/errors/validation-error.js";
import NotFoundError from "../../domain/errors/not-found-error.js";
import UnauthorizedError from "../../domain/errors/unauthorized-error.js";

const globalErrorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(401).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default globalErrorHandlingMiddleware;
