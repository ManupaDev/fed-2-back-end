class UnauthorizedError extends Error {
  constructor(message:string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;