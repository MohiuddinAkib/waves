import httpStatusCodes from "http-status-codes";
import * as messages from "@/constants/messages";

export default class LoginFailed extends Error {
  constructor(
    message = messages.LOGIN_FAILED,
    public status = httpStatusCodes.BAD_REQUEST
  ) {
    super(message);
  }
}
