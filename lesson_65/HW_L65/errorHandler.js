export class ErrorHandler extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }
}

export class ErrorUnauthorized extends ErrorHandler {
  constructor(message) {
    super(401, message);
  }
}

export class ErrorObjectNotFound extends ErrorHandler {
  constructor(message) {
    super(404, message);
  }
}

export class ErrorUserAlreadyExists extends ErrorHandler {
  constructor(message) {
    super(409, message);
  }
}

export class ErrorValidation extends ErrorHandler {
  constructor(message) {
    super(400, message);
  }
}

export class ErrorReadWriteFile extends ErrorHandler {
  constructor(message) {
    super(500, message);
  }
}