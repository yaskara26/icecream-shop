import ApplicationError from "./ApplicationError";

class DoesNotExistsError extends ApplicationError {

  constructor(message: string) {
    super('DoesNotExistsError', message, 400);
  }
}

export default DoesNotExistsError;