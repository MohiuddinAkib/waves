import httpStatusCodes from "http-status-codes";

export default class BadRequest extends Error {
  constructor(
    message = httpStatusCodes.getStatusText(httpStatusCodes.BAD_REQUEST),
    public status = httpStatusCodes.BAD_REQUEST
  ) {
    super(message);
  }
}
