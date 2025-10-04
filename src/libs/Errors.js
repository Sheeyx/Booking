// Standard HTTP codes
export const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NOT_MODIFIED: 304,
  INTERNAL_ERROR: 500,
};

// Common response messages
export const Message = {
  CREATE_FAILED: "Create failed",
  UPDATE_FAILED: "Update failed",
  REMOVE_FAILED: "Remove failed",
  NO_DATA_FOUND: "No data found",
  INVALID_INPUT: "Invalid input",
  SERVER_ERROR: "Internal Server Error",
ALREADY_EXISTS: "You already reserved a seat for this event",

};

export default class Errors extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  static badRequest(msg = Message.INVALID_INPUT) {
    return new Errors(HttpCode.BAD_REQUEST, msg);
  }

  static notFound(msg = Message.NO_DATA_FOUND) {
    return new Errors(HttpCode.NOT_FOUND, msg);
  }

  static notModified(msg = Message.UPDATE_FAILED) {
    return new Errors(HttpCode.NOT_MODIFIED, msg);
  }

  static internal(msg = Message.SERVER_ERROR) {
    return new Errors(HttpCode.INTERNAL_ERROR, msg);
  }
}
