import ApplicationError from "./ApplicationError";

class AlreadyExistsError extends ApplicationError {

  constructor(message: string) {
    super('AlreadyExistsError', message, 400);
  }
}

export default AlreadyExistsError;